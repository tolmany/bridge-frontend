import Head from "next/head";
import Image from "next/image";
import EthereumSignerKey from "../components/EthereumSignerKey";
import HumanWalletKey from "../components/HumanWalletKey";
import HumansLogo from "../../public/humans-logo.svg";

import { selectTransferTargetChain } from "../store/selectors"
import { CHAIN_ID_ETH } from "../utils/consts.ts";
import { useSelector } from "react-redux";

export default function connectDestination() {
  const targetChain = useSelector(selectTransferTargetChain);

  return (
    <div>
      <Head>
        <title>Connect Destination Wallet</title>
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
                    <span className="badge rounded-pill bg-base-300 text-dark bg-primary mr-2">1</span> Connect source wallet
                  </div>
                  <div className="w-50 text-center">
                    <span className="badge rounded-pill bg-primary mr-2">2</span> Connect destination wallet
                  </div>
                </div>
                <div className="d-flex w-100 px-4 mb-4">
                  <div className="progress w-100">
                    <div className="progress-bar w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
                {
                  targetChain == CHAIN_ID_ETH ? (
                    <EthereumSignerKey/>
                  ) : (
                    <HumanWalletKey/>
                  )
                }
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
