
  import { hexlify, hexStripZeros } from "@ethersproject/bytes";
  // import  useHumanchainConnection from "./useHumanchainConnection";
  import { useCallback, useMemo } from "react";
  import { useEthereumProvider } from "../contexts/EthereumProviderContext";
  import { useHumanProvider } from "../contexts/HumanProviderContext"
  import { CLUSTER, ChainId, getEvmChainId, CHAIN_ID_HUMAN, isEVMChain } from "../utils/consts";

  const createWalletStatus = (
    isReady: boolean,
    statusMessage: string = "",
    forceNetworkSwitch: () => void,
    walletAddress?: string
  ) => ({
    isReady,
    statusMessage,
    forceNetworkSwitch,
    walletAddress,
  });
  
  function useIsWalletReady(
    chainId: ChainId,
    enableNetworkAutoswitch: boolean = true
  ): {
    isReady: boolean;
    statusMessage: string;
    walletAddress?: string;
    forceNetworkSwitch: () => void;
  } {
    const autoSwitch = enableNetworkAutoswitch;
    
    const {
      humanAddress,
      humanSignerClient
    } = useHumanProvider();
    const hasHumanWallet = !!humanSignerClient;
  
    const {
      provider,
      signerAddress,
      chainId: evmChainId,
    } = useEthereumProvider();
  
    const hasEthInfo = !!provider && !!signerAddress;
    const correctEvmNetwork = getEvmChainId(chainId);
    const hasCorrectEvmNetwork = evmChainId === correctEvmNetwork;
    // const hasCorrectEvmNetwork = evmChainId === RINKEBY_ETH_NETWORK_CHAIN_ID;
  
    const forceNetworkSwitch = useCallback(() => {
      if (provider && correctEvmNetwork) {
        if (!isEVMChain(chainId)) {
          return;
        }
  
        // Put code manually to Goerli for now
        try {
          provider.send("wallet_switchEthereumChain", [
            { chainId: hexStripZeros(hexlify(correctEvmNetwork)) },
          ]);
        } catch (e) {}
      }
    }, [provider, correctEvmNetwork, chainId]);
  
    return useMemo(() => {
      if (
        chainId === CHAIN_ID_HUMAN &&
        hasHumanWallet &&
        humanAddress
      ) {
        // TODO: terraWallet does not update on wallet changes
        return createWalletStatus(
          true,
          undefined,
          forceNetworkSwitch,
          humanAddress
        );
      }

      if (isEVMChain(chainId) && hasEthInfo && signerAddress) {
        if (hasCorrectEvmNetwork) {
          return createWalletStatus(
            true,
            undefined,
            forceNetworkSwitch,
            signerAddress
          );
        } else {
          if (provider && correctEvmNetwork && autoSwitch) {
            forceNetworkSwitch();
          }
          return createWalletStatus(
            false,
            `Wallet is not connected to ${CLUSTER}. Expected Chain ID: ${correctEvmNetwork}`,
            forceNetworkSwitch,
            undefined
          );
        }
      }
  
      return createWalletStatus(
        false,
        "Wallet not connected",
        forceNetworkSwitch,
        undefined
      );
    }, [
      chainId,
      autoSwitch,
      forceNetworkSwitch,
      hasHumanWallet,
      hasEthInfo,
      correctEvmNetwork,
      hasCorrectEvmNetwork,
      provider,
      signerAddress,
      humanAddress
    ]);
  }
  
  export default useIsWalletReady;
  