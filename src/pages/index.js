import { useState } from "react"
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import HumansLogo from "../../public/humans-logo.svg";
import hIcon from "../../public/hIcon.svg";
import eIcon from "../../public/eIcon.svg";
import lineBetween from "../../public/line-between.svg";
import ChainType from "../components/ChainType";

import { selectTransferOriginChain } from "../store/selectors"
import { useDispatch, useSelector } from "react-redux";
import { CHAIN_ID_ETH, CHAIN_ID_HUMAN } from "../utils/consts.ts";
import { setOriginChain, setTargetChain, setAmount } from "../store/transferSlice.ts";

import usePoolBalance from "../integration/humans/usePoolBalance";
import { useSnackbar } from "notistack";
import { Alert } from "@material-ui/lab";

export default function Home() {
  const {ethereumBalance, humanBalance} = usePoolBalance();
  const [amount, setTransferAmount] = useState("");
  const [fee, setFeeAmount] = useState("");
  const router = useRouter();

  const dispatch = useDispatch();
  const originChain = useSelector(selectTransferOriginChain);
  const { enqueueSnackbar } = useSnackbar();
  
  const handleChange = (event) => {
    const v = event.target.value
    if (v > 0) {
      setTransferAmount(v);

      let f = 10
      if (v < 10 ) f = 1;
      else if (v < 100 ) f = 2;
      else if (v < 500 ) f = 5;
    
      setFeeAmount(f)
    }
  };

  // When clicked on wallet connect
  const onClickWalletConnect = () => {
    if (!amount) {
      enqueueSnackbar(null, {
        content: <Alert severity="error">Invalid transfer amount</Alert>,
      });
      return;
    }

    const poolBalance = originChain == CHAIN_ID_ETH ? ethereumBalance : humanBalance;
    if (+poolBalance < +amount) {
      enqueueSnackbar(null, {
        content: <Alert severity="error">Can't transfer more than pool balance!</Alert>,
      });
      return;
    }

    dispatch(setAmount(amount));
    router.push('/connect-source');
  }

  // Switch network
  function switchNetwork() {
    if (originChain == CHAIN_ID_ETH  ) {
      dispatch(setOriginChain(CHAIN_ID_HUMAN));
      dispatch(setTargetChain(CHAIN_ID_ETH));
    } else {
      dispatch(setOriginChain(CHAIN_ID_ETH));
      dispatch(setTargetChain(CHAIN_ID_HUMAN));
    }
  }

  return (
    <div>
      <Head>
        <title>Setup Bridge</title>
        <meta name="description" content="Bring your Ethereum blockchain assets to Humans blockchain" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg d-flex flex-column align-items-center justify-content-center">
        <div className="mx-auto mb-4 mt-5">
          <Image src={HumansLogo} alt="Humans.ai Bridge logo" />
        </div>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-12 col-md-10 col-lg-7 col-xl-6">
              <form className="mx-auto mb-5">
                <div className="form-header mb-3">
                  <p className="title">Setup bridge</p>
                  <p className="subtitle">Bring your Ethereum blockchain assets to Humans blockchain</p>
                </div>
                <div className="form-content">
                  <div className="from-to d-flex flex-column flex-sm-row justify-content-center">
                    <ChainType isOrigin={true} chainId = {originChain} balance={originChain==CHAIN_ID_ETH?ethereumBalance:humanBalance}/>
                    <div className="d-flex line-between" onClick={switchNetwork}>
                      <Image src={lineBetween} alt="line between" className="rotate-on-mobile" />
                    </div>
                    <ChainType isOrigin={false} chainId = {originChain} balance={originChain==CHAIN_ID_ETH?humanBalance:ethereumBalance}/>
                  </div>
                  <div className="inputs p-4">
                    <label htmlFor="heart" className="form-label mb-1">
                      Asset
                    </label>
                    <div className="input-group mb-4 w-100">
                      {
                        originChain == CHAIN_ID_ETH ? (
                          <input type="text" className="form-control" value="$ERC20 Heart " aria-label="asset" aria-describedby="erc20" disabled />
                        ) : (
                          <input type="text" className="form-control" value="$Humans Heart " aria-label="asset" aria-describedby="heart" disabled />
                        )
                      }
                      <span className="input-group-text" id="heart">
                        {
                          originChain == CHAIN_ID_ETH ? (
                            <Image className="w-11 h-16" src={eIcon} alt="ethereum short logo" />
                          ):(
                            <Image className="w-11 h-16" src={hIcon} alt="humans short logo" />
                          )
                        }
                      </span>
                    </div>
                    <div className="mb-4 w-100">
                      <label htmlFor="assetInput" className="form-label mb-1">
                        Enter amount
                      </label>
                      <input type="number" className="form-control" id="assetInput" onChange={handleChange} value={amount} />
                    </div>
                  </div>
                </div>
                <div className="form-footer p-4">
                  <div className="footer-info w-100 mb-1">
                    <div className="d-flex justify-content-between w-100">
                      <span>Fee: </span>
                      <span>
                        <span className="font-bold">{fee}</span>
                        <span>$Heart</span>
                      </span>
                    </div>
                  </div>
                  <div className="footer-info w-100 mb-1">
                    <div className="d-flex justify-content-between w-100">
                      <span>You will receive: </span>
                      <span>
                        <span className="font-bold">{amount-fee}</span>
                        <span>$Heart</span>
                      </span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center w-100">
                    <button className="btn btn-primary btn-gradient w-100 mt-3 font-bold" type="button" onClick={onClickWalletConnect}>
                      CONNECT WALLETS
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="d-flex mt-auto">
          <footer className="text-center font-xs">
            <p>Copyright © 2022 - All rights reserved by Humans.ai</p>
          </footer>
        </div>

      </div>


    </div>
  );
}
