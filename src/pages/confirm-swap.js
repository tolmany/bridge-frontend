import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import hLogo from "../../public/h-logo.svg";
import hToken from "../../public/h-token.svg"
import HumansLogo from "../../public/humans-logo.svg";
import {
  selectTransferOriginChain,
  selectSourceWalletAddress,
  selectTransferAmount,
  selectTransferTargetChain,
  selectTransferTargetAddressHex,
} from "../store/selectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faRefresh } from "@fortawesome/free-solid-svg-icons";

import ReviewChainType from "../components/ReviewChainType";
import { useSelector } from "react-redux";
import { CHAIN_ID_ETH } from "../utils/consts";
import { useEffect } from "react";
import { CalcFee } from "../integration/humans/common"

export default function ConfirmSwap() {
  const originChain = useSelector(selectTransferOriginChain);
  const sourceWallet = useSelector(selectSourceWalletAddress);
  const transferAmount = useSelector(selectTransferAmount);
  const targetChain = useSelector(selectTransferTargetChain);
  const destinationWallet = useSelector(selectTransferTargetAddressHex);
  const serviceFee = CalcFee();

  useEffect(() => {
    localStorage.setItem("approve-tx", "false");
    localStorage.setItem("send-tx", "false");
  }, [])

  useEffect(() => {
    localStorage.setItem("approve-tx", "false");
    localStorage.setItem("send-tx", "false");
  }, [])

  return (
    <div>
      <Head>
        <title>Confirm Swap</title>
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
                <div className="border-bottom border-base-300 w-100 p-4 mb-3">
                  <p className="title mb-4">Review transaction</p>
                  <div className="d-flex flex-column flex-sm-row w-100 gap-5">
                    <ReviewChainType
                      isFrom={true}
                      chain={originChain}
                      wallet={sourceWallet}
                    ></ReviewChainType>

                    <ReviewChainType
                      isFrom={false}
                      chain={targetChain}
                      wallet={destinationWallet}
                    ></ReviewChainType>

                  </div>
                </div>

                <div className="form-content w-100 p-4">
                  <div className="d-flex w-100">
                    <div className="d-flex w-50 flex-column">
                      <div className="mb-4">
                        <div>Asset</div>
                        <div className="smaller-title">$HEART</div>
                      </div>
                      <div className="">
                        <div>Amount</div>
                        <div className="smaller-title">{transferAmount}</div>
                      </div>
                    </div>
                    <div className="d-flex w-50 flex-column justify-content-center align-items-end">
                      <div className="token">
                        <Image src={hToken} alt="humans token" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-footer p-4">
                  <div className="footer-info w-100 mb-1">
                    <div className="d-flex justify-content-between w-100">
                      <span>Fee: </span>
                      <span>
                        <span className="font-bold">{serviceFee}</span>
                        <span>$Heart</span>
                      </span>
                    </div>
                  </div>
                  <div className="footer-info w-100 mb-1">
                    <div className="d-flex justify-content-between w-100">
                      <span>You will receive: </span>
                      <span>
                        <span className="font-bold">{transferAmount-serviceFee}</span>
                        <span>$Heart</span>
                      </span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center w-100">
                    <Link href="approve-transaction">
                      <button className="btn btn-primary btn-gradient w-100 mt-3" type="button">
                        <FontAwesomeIcon icon={faCheck} style={{ fontSize: 24 }} className="text-white" />
                        CONFIRM SWAP
                      </button>
                    </Link>
                  </div>
                  <div className="d-flex justify-content-center w-100">
                    <Link href="/">
                      <button className="btn btn-gri-outline w-100 mt-3" type="button">
                        <FontAwesomeIcon icon={faRefresh} style={{ fontSize: 18 }} className="text-black" /> RESTART
                      </button>
                    </Link>
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
