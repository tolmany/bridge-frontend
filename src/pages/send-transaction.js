import Head from "next/head";
import Image from "next/image";
import HumansLogo from "../../public/humans-logo.svg";
import {
  selectTransferOriginChain,
} from "../store/selectors";
import { useSelector } from "react-redux";
import Router from 'next/router';
import { useEffect } from "react";
import { useHandleTransfer } from "../hooks/useHandleTransfer";
import useSendToken from "../integration/humans/useSendToken";
import moment from "moment"
import { Alert } from "@material-ui/lab";
import { useSnackbar } from "notistack";

export default function SendTransaction() {
  const { handleEVMtransfer } = useHandleTransfer();
  const { handleSendToken } = useSendToken();
  const originChain = useSelector(selectTransferOriginChain);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    let send_tx = localStorage.getItem("send-tx");
    if (send_tx == "true") {
      return;
    }

    localStorage.setItem("send-tx", "true");

    // Process
    setTimeout(() => {
      processTransfer();
    }, 1000);
  }, [])

  const processTransfer = async () => {
    // Process transfer token through wallet
    let result = false
    if (originChain == 3) // Human
      result = await handleSendToken();
    else
      result = await handleEVMtransfer();

    if (!result) {
      enqueueSnackbar(null, {
        content: <Alert severity="error">Error!</Alert>,
      });
      Router.push("/confirm-swap");

      return;
    }

    enqueueSnackbar(null, {
      content: <Alert severity="success">You have approved the transaction. Humanschain works to finalize the transfer.</Alert>,
    });

    localStorage.setItem("start-tx", moment().utc().toISOString());
    Router.push("/submission-progress");
  }

  return (
    <div>
      <Head>
        <title>Send Transaction</title>
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
                <div className="d-flex w-100 px-4 pt-4 pb-2">
                  <div className="w-50 text-center transparent">
                    <span className="badge rounded-pill bg-base-300 text-dark bg-primary mr-2">1</span> Approve transaction
                  </div>
                  <div className="w-50 text-center">
                    <span className="badge rounded-pill bg-primary mr-2">2</span> Send transaction
                  </div>
                </div>
                <div className="d-flex w-100 px-4 mb-4">
                  <div className="progress w-100">
                    <div className="progress-bar w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center w-100 mt-4">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>

                <div className="form-content d-flex justify-content-center align-items-center p-4">
                  <div className="title mb-2">Sending a transaction</div>
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
