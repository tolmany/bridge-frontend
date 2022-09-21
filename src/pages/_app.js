import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import "regenerator-runtime/runtime";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import '../styles/scss/global.scss' // added
import "../styles/globals.css";

import { useEffect, useState } from "react";

import { EthereumProviderProvider } from "../contexts/EthereumProviderContext";
import { HumanchainProvider } from "../contexts/HumanProviderContext";
import TransferAmountContext from '../contexts/TransferAmountContext.js';
import { store } from "../store";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  const supportedChainIds = [80001, 4]; //list of networks that are supported by our app. 80001 = Mumbai Testnet Network and 4 = Rinkeby Testnet Network

  const connectors = {
    injected: {},
  };

  const [amount, setSession] = useState()
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>

        <EthereumProviderProvider>
          <HumanchainProvider>

            <TransferAmountContext.Provider value={{ amount, setSession }}><Component {...pageProps} /></TransferAmountContext.Provider>)
          </HumanchainProvider>

        </EthereumProviderProvider>
      </SnackbarProvider>

    </Provider>
  );
}

export default MyApp;