import Head from "next/head";
import Image from "next/image";
import HumansLogo from "../../public/humans-logo.svg";
import useRequestTransaction from "../integration/humans/useRequestTransaction";
import Router from 'next/router';
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { Alert } from "@material-ui/lab";

export default function ApproveTransaction() {
  const { handleTransaction } = useRequestTransaction();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    let approve_tx = localStorage.getItem("approve-tx");
    if (approve_tx == "true") {
      return;
    }
    localStorage.setItem("approve-tx", "true");

    // Process
    setTimeout(() => {
      requestTransaction();
    }, 1000);
  }, [])

  const requestTransaction = async () => {
    const result = await handleTransaction();
    
    // if there occurs an error
    if (!result) {
      enqueueSnackbar(null, {
        content: <Alert severity="error">Error!</Alert>,
      });

      Router.push("/confirm-swap");

      return
    }

    enqueueSnackbar(null, {
      content: <Alert severity="success">Transaction request was approved by Humanschain.</Alert>,
    });

    Router.push("/send-transaction");
  }

  return (
    <div>
      <Head>
        <title>Approve Transaction</title>
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
                  <div className="w-50 text-center">
                    <span className="badge rounded-pill bg-primary mr-2">1</span> Approve transaction
                  </div>
                  <div className="w-50 text-center transparent">
                    <span className="badge rounded-pill bg-base-300 text-dark mr-2">2</span> Send transaction
                  </div>
                </div>
                <div className="d-flex w-100 px-4 mb-4">
                  <div className="progress w-100">
                    <div className="progress-bar w-50" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center w-100 mt-4">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>

                <div className="form-content d-flex justify-content-center align-items-center p-4">
                  <div className="title mb-2">Approve transaction in Keplr</div>
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
