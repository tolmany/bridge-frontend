import { useEthereumProvider } from "../contexts/EthereumProviderContext";
import ToggleConnectedButton from "./ToggleConnectedButton";
import useIsWalletReady from "../hooks/useIsWalletReady";
import { CHAIN_ID_ETH } from "../utils/consts";

import Router, { useRouter } from 'next/router';
import { useDispatch } from "react-redux";

import { setSourceWalletAddress, setTargetAddressHex } from "../store/transferSlice";

const EthereumSignerKey = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { connect, disconnect, signerAddress } = useEthereumProvider();
    const { isReady} = useIsWalletReady(CHAIN_ID_ETH);

    function navigate() {
        if (router.pathname == "/connect-source") {
            dispatch(setSourceWalletAddress(signerAddress))
            Router.push("/connect-destination");
        } else if (router.pathname == "/connect-destination") {
            dispatch(setTargetAddressHex(signerAddress))
            Router.push("/confirm-swap");
        }
    }
    
    return (
        <>
            <div className="form-content d-flex justify-content-center align-items-center p-4">
                <img src="./ethereum-connect-logo.svg" alt="ethereum logo" />
                <div className="title mb-2">Connect Ethereum wallet</div>
                <div className="subtitle">From funds</div>
                <ToggleConnectedButton
                    connect={connect}
                    disconnect={disconnect}
                    connected={!!signerAddress}
                    pk={signerAddress || ""}
                    title={"OPEN METAMASK"}
                />
                { signerAddress && isReady ? (
                    <button className="btn btn-gri w-100 mt-3" type="button" onClick={navigate}>
                        Next
                    </button>
                ): null}
            </div>
        </>
    );
};

export default EthereumSignerKey;