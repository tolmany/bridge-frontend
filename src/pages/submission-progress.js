import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import HumansLogo from "../../public/humans-logo.svg";
import emptyLineBetween from "../../public/empty-line-between.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { 
  selectTransferOriginChain,
  selectSourceWalletAddress,
  selectTransferAmount,
  selectTransferTargetChain,
  selectTransferTargetAddressHex,
  selectOriginSentTxHash,
  selectTargetSentTxHash,
 } from "../store/selectors"
import { useSelector } from "react-redux";
import ChainType from "../components/ChainType";
import TransactionLog from "../components/TransactionLog";
import { CalcFee } from "../integration/humans/common"
import { useEffect, useState } from "react";
import moment from "moment"
import { useSnackbar } from "notistack";
import { Alert } from "@material-ui/lab";

export default function SubmissionProgress() {
  const originChain = useSelector(selectTransferOriginChain);
  const sourceWallet = useSelector(selectSourceWalletAddress);
  const transferAmount = useSelector(selectTransferAmount);
  const targetChain = useSelector(selectTransferTargetChain);
  const destinationWallet = useSelector(selectTransferTargetAddressHex);
  
  const originSentTxHash = useSelector(selectOriginSentTxHash);
  const targetSentTxHash = useSelector(selectTargetSentTxHash);
  const serviceFee = CalcFee();
  
  const startTime = moment(localStorage.getItem("start-tx"));
  const [currentTime, setCurrentTime] = useState(moment().utc());
  const timeBetween = moment.duration(currentTime.diff(startTime));
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    enqueueSnackbar(null, {
      content: <Alert severity="success">Transfer completed.</Alert>,
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Head>
        <title>Submission in Progress</title>
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
                  <p className="title">Submission in progress</p>
                </div>
                <div className="form-content">
                  <div className="from-to d-flex flex-column flex-sm-row justify-content-center">
                    <ChainType isOrigin={true} chainId = {originChain} />

                    <div className="d-flex line-between text-center justify-content-center align-items-center">
                      <Image src={emptyLineBetween} alt="line between" className="rotate-on-mobile" />
                      <div className="progress-info">
                        <div className="timer text-white text-sm">{timeBetween.minutes()}:{timeBetween.seconds()}</div>
                      </div>
                    </div>
                    <ChainType isOrigin={false} chainId = {originChain} />
                  </div>
                </div>

                <TransactionLog
                  isOrigin = {true}
                  chainId = {originChain}
                  wallet = {sourceWallet}
                  txHash = {originSentTxHash}
                  amt = {transferAmount}
                ></TransactionLog>
                
                <TransactionLog
                  isOrigin = {false}
                  chainId = {targetChain}
                  wallet = {destinationWallet}
                  txHash = {selectTargetSentTxHash}
                  amt = {transferAmount-serviceFee}
                ></TransactionLog>

                <div className="form-content d-flex flex-column flex-sm-row w-100 px-4 pt-4 pb-2 gap-3">
                <Link href="/">
                  <button className="btn btn-gri-outline w-100 mt-3" type="button">
                    <FontAwesomeIcon icon={faRefresh} style={{ fontSize: 18 }} className="text-black" /> RESTART
                  </button>
                </Link>
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
