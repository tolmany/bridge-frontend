import ToggleConnectedButton from "./ToggleConnectedButton";
import { useHumanProvider } from "../contexts/HumanProviderContext";
import Router, { useRouter } from 'next/router';
import { setSourceWalletAddress, setTargetAddressHex } from "../store/transferSlice";
import { useDispatch } from "react-redux";

const HumanWalletKey = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { connect, disconnect, humanAddress } = useHumanProvider();

  function navigate() {
    if (router.pathname == "/connect-source") {
        dispatch(setSourceWalletAddress(humanAddress))
        Router.push("/connect-destination");
    } else if (router.pathname == "/connect-destination") {
        dispatch(setTargetAddressHex(humanAddress))
        Router.push("/confirm-swap");
    }
  }

  return (
    <>
      <div className="form-content d-flex justify-content-center align-items-center p-4">
        <img src="./h-connect-logo.svg" alt="ethereum logo" />
        <div className="title mb-2">Connect Humans wallet</div>
        <div className="subtitle">Destination funds</div>
        <ToggleConnectedButton
          connect={connect}
          disconnect={disconnect}
          connected={!!humanAddress}
          pk={humanAddress || ""}
          title={"OPEN KEPLR"}
        />
        {humanAddress ? (
          <button className="btn btn-gri w-100 mt-3" type="button" onClick={navigate}>
            Next
          </button>
        ) : null }
      </div>
    </>
  );
};

export default HumanWalletKey;
