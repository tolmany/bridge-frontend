import React, {
    ReactNode,
    useCallback,
    useContext,
    useMemo,
    useState,
  } from "react";
  
  interface IHumanProviderContext {
    connect(): void;
    disconnect(): void;
    chainId: number | undefined;
  
    humanAddress: string | undefined;
    humanSignerClient: any;
  }
  
  const HumanProviderContext = React.createContext<IHumanProviderContext>({
    connect: () => {},
    disconnect: () => { },
    chainId: undefined,
    humanAddress: undefined,
    humanSignerClient: null
  });
  
  export const HumanchainProvider = ({
    children,
  }: {
    children: ReactNode;
  }) => {
    const [chainId, setChainId] = useState<number | undefined>(undefined);
    const [humanAddress, setWalletAddress] = useState<string | undefined>(undefined);
    const [humanSignerClient, setWalletClient] = useState<any>(undefined);
  
    // Button handler button for handling a request window event for Keplr.
    const connect = useCallback(async () => {
      if (window.keplr) {
        if (!window.getOfflineSigner || !window.keplr) {
          alert("Please install keplr extension");
        } else {
          if (window.keplr.experimentalSuggestChain) {
            try {
              await window.keplr.experimentalSuggestChain({
                // Chain-id of the Cosmos SDK chain.
                chainId: "testhuman",
                // The name of the chain to be displayed to the user.
                chainName: "Humanchain",
                // RPC endpoint of the chain.
                rpc: "https://devnet-explorer-rpc.humans.zone",
                // REST endpoint of the chain. // https://devnet-explorer-api.humans.zone/
                rest: "https://devnet-explorer-api.humans.zone",
                // Staking coin information
                stakeCurrency: {
                  // Coin denomination to be displayed to the user.
                  coinDenom: "HEART",
                  // Actual denom (i.e. uatom, uscrt) used by the blockchain.
                  coinMinimalDenom: "uheart",
                  // # of decimal points to convert minimal denomination to user-facing denomination.
                  coinDecimals: 6,
                  // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                  // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                  // coinGeckoId: ""
                },
                bip44: {
                  // You can only set the coin type of BIP44.
                  // 'Purpose' is fixed to 44.
                  coinType: 118,
                },
                bech32Config: {
                  bech32PrefixAccAddr: "human",
                  bech32PrefixAccPub: "humanpub",
                  bech32PrefixValAddr: "humanvaloper",
                  bech32PrefixValPub: "humanvaloperpub",
                  bech32PrefixConsAddr: "humanvalcons",
                  bech32PrefixConsPub: "humanvalconspub"
                },
                // List of all coin/tokens used in this chain.
                currencies: [{
                  // Coin denomination to be displayed to the user.
                  coinDenom: "HEART",
                  // Actual denom (i.e. uatom, uscrt) used by the blockchain.
                  coinMinimalDenom: "uheart",
                  // # of decimal points to convert minimal denomination to user-facing denomination.
                  coinDecimals: 6,
                  // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                  // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                  // coinGeckoId: ""
                }],
                // List of coin/tokens used as a fee token in this chain.
                feeCurrencies: [{
                  // Coin denomination to be displayed to the user.
                  coinDenom: "HEART",
                  // Actual denom (i.e. uatom, uscrt) used by the blockchain.
                  coinMinimalDenom: "uheart",
                  // # of decimal points to convert minimal denomination to user-facing denomination.
                  coinDecimals: 6,
                  // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                  // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                  // coinGeckoId: ""
                }],
                // (Optional) This is used to set the fee of the transaction.
                // If this field is not provided, Keplr extension will set the default gas price as (low: 0.01, average: 0.025, high: 0.04).
                // Currently, Keplr doesn't support dynamic calculation of the gas prices based on on-chain data.
                // Make sure that the gas prices are higher than the minimum gas prices accepted by chain validators and RPC/REST endpoint.
                gasPriceStep: {
                  low: 0.01,
                  average: 0.025,
                  high: 0.04
                }
              });
            } catch {
              alert("Failed to suggest the chain");
            }
          } else {
            alert("Please use the recent version of keplr extension");
          }
        }
  
        const chainId = "testhuman"
        // Unlock the wallet.
        await window.keplr.enable(chainId);
  
        // Use offlineSigner to get first wallet and public key.
        // Currently only first address is supported.
        const offlineSigner = await window.keplr.getOfflineSigner(chainId);
        const keplrAccounts = await offlineSigner.getAccounts();
  
        // Set state value as first address.
        setWalletAddress(keplrAccounts[0].address);
        setWalletClient(offlineSigner)
  
      } else {
        alert("Keplr extension is not installed.");
      }
    }, []);
  
    const disconnect = useCallback(() => {
      setWalletAddress(undefined);
      setWalletClient(null)
    }, []);
  
    const contextValue = useMemo(
      () => ({
        connect,
        disconnect,
        chainId,
        humanAddress,
        humanSignerClient
      }),
      [
        connect,
        disconnect,
        chainId,
        humanAddress,
        humanSignerClient
      ]
    );
    return (
      <HumanProviderContext.Provider value={contextValue}>
        {children}
      </HumanProviderContext.Provider>
    );
  };
  
  export const useHumanProvider = () => {
    return useContext(HumanProviderContext);
  };
  