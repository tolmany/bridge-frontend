import { useSelector } from "react-redux";
import { useCallback, useMemo, useState } from "react";
import { MsgRequestTransaction } from "../humans-sdk/tx";
import { TxClient, MissingWalletError, CalcFee} from "./common"
import { useHumanProvider } from "../../contexts/HumanProviderContext"
import { 
  selectTransferOriginChain, 
  selectSourceWalletAddress,
  selectTransferTargetAddressHex,
  selectTransferTargetChain,
  selectTransferAmount,
 } from '../../store/selectors';
import { CHAIN_ID_ETH, CHAIN_ID_HUMAN } from "../../utils/consts";

export default function useRequestTransaction() {
  const [transactionResult, setTransactionResult] = useState(false);
  const [txRequesting, setTxRequesting] = useState(false);

  const sourceWalletAddress = useSelector(selectSourceWalletAddress);
  const targetAddressHex = useSelector(selectTransferTargetAddressHex);

  const sourceChain = useSelector(selectTransferOriginChain);
  const targetChain = useSelector(selectTransferTargetChain);
  const sourceAmount = useSelector(selectTransferAmount);

  const serviceFee = CalcFee();

  const {
    humanSignerClient
  } = useHumanProvider();

  const sendMsgRequestTransaction = async (fee = [], memo = '') => {
    try {
      const client = await TxClient(humanSignerClient);
      const [firstAccount] = await humanSignerClient.getAccounts();

      let oChain = "Human";
      if (sourceChain == CHAIN_ID_ETH) {
        oChain = "Ethereum"
      }

      let tChain = "Ethereum"
      if (targetChain == CHAIN_ID_HUMAN) {
        tChain = "Human"
      }

      const value: MsgRequestTransaction = {
        creator: firstAccount.address,
        originChain: oChain,
        originAddress: sourceWalletAddress as string,
        targetChain: tChain,
        targetAddress: targetAddressHex as string,
        amount: sourceAmount,
        fee: "" + serviceFee,
      };

      const msg = await client.msgRequestTransaction(value)
      const e = await client.signAndBroadcast([msg], { fee: { amount: fee, gas: "200000" }, memo })
      console.log(e)

      return true
    } catch (e: any) {
      if (e == MissingWalletError) {
        console.log('TxClient:MsgRequestTransaction:Init Could not initialize signing client. Wallet is required.')
      } else {
        console.log('TxClient:MsgRequestTransaction:Send Could not broadcast Tx: ' + e.message)
      }

      return false
    }
  }

  const handleRequestTransaction = useCallback(async () => {
    setTxRequesting(true)
    const result = await sendMsgRequestTransaction();
    setTransactionResult(result);
    setTxRequesting(false)

    return result
  }, [transactionResult]);

  return useMemo(
    () => ({
      txRequesting, transactionResult, handleTransaction: handleRequestTransaction
    }),
    [
      txRequesting, transactionResult, handleRequestTransaction
    ]
  );
}

