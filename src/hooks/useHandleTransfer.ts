import {
    isEVMChain,
} from "../utils/consts";

import { Signer, ethers } from "ethers";
import { parseUnits } from "ethers/lib/utils";
// import { useSnackbar } from "notistack";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useEthereumProvider } from "../contexts/EthereumProviderContext";

import erc20ABI from "../integration/humans/ethereum/erc20ABI.json";
import { StandardToken } from "../integration/humans/ethereum/erc20Token";
import { CalcFee } from "../integration/humans/common"

import useTransferTargetAddressHex from "./useTransferTargetAddress";
import {
    selectTransferOriginChain,
    selectTransferTargetChain,
    selectTransferAmount,
} from "../store/selectors";

import { setOriginSentTxHash } from "../store/transferSlice";

async function evm(
    dispatch: any,
    enqueueSnackbar: any,
    signer: Signer,
    decimals: number,
    amount: string,
    serviceFee: number,
): Promise<boolean> {
    const { ethereum } = window as any;
    const provider = new ethers.providers.Web3Provider(ethereum);

    const tokenAddress = process.env.NEXT_APP_Ethereum_USDK_Token_Address as string;

    if (provider !== undefined) {
        const contract = new ethers.Contract(
            tokenAddress,
            erc20ABI.abi,
            signer
        ) as StandardToken;

        try {
            //-----------------------------------
            // Step 1, Transfer Token from user wallet to ethereum pool
            //-----------------------------------
            const baseAmountParsed = parseUnits(amount, decimals);

            // Ethereum Pool Address
            const toAddress = process.env.NEXT_APP_ETHEREUM_POOL_ADDRESS as string;

            const transaction = await contract.transfer(toAddress, baseAmountParsed);
            // Wait for the transaction to be mined...
            const transaction_info = await transaction.wait();
            console.log(`[Success] Transaction Hash: ${transaction_info.blockHash}`);

            // Dispatch Origin TxHash
            dispatch(setOriginSentTxHash(transaction_info.blockHash))

            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    } else {
        return false;
    }
}

export function useHandleTransfer() {
    const dispatch = useDispatch();

    const originChain = useSelector(selectTransferOriginChain);
    const targetChain = useSelector(selectTransferTargetChain);

    const sourceAmount = useSelector(selectTransferAmount);
    const targetAddress = useTransferTargetAddressHex();

    const isTargetComplete = false;
    const isSending = false;
    const isSendComplete = false;
    const { signer } = useEthereumProvider();
    const disabled = !isTargetComplete || isSending || isSendComplete;

    const serviceFee = CalcFee();

    const handleTransferClick = useCallback(async () => {
        // TODO: we should separate state for transaction vs fetching vaa
        let walletTransferred = false;
        if (
            isEVMChain(originChain) &&
            !!signer &&
            !!targetAddress
        ) {
            walletTransferred = await evm(
                dispatch,
                null,
                signer,
                18,
                sourceAmount,
                serviceFee,
            );
        }

        return walletTransferred
    }, [
        dispatch,
        null,
        originChain,
        signer,
        "relayerFee",
        sourceAmount,
        18,
        targetChain,
        targetAddress,
        originChain,
    ]);
    return useMemo(
        () => ({
            handleEVMtransfer: handleTransferClick,
            disabled,
            showLoader: isSending,
        }),
        [handleTransferClick, disabled, isSending]
    );
}
