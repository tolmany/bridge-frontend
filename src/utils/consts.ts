export declare type ChainId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 10001;
export const CHAIN_ID_SOLANA: ChainId = 1;
export const CHAIN_ID_ETH: ChainId = 2;
export const CHAIN_ID_HUMAN: ChainId = 3;
export const CHAIN_ID_BSC: ChainId = 4;
export const CHAIN_ID_POLYGON: ChainId = 5;
export const CHAIN_ID_ETHEREUM_ROPSTEN: ChainId = 6;

export const isEVMChain = (chainId: ChainId) => {
    if (chainId == CHAIN_ID_ETH || chainId == CHAIN_ID_BSC || chainId == CHAIN_ID_POLYGON || chainId == CHAIN_ID_ETHEREUM_ROPSTEN) {
        return true;
    }

    return false;
}

export type Cluster = "devnet" | "testnet" | "mainnet";
export const CLUSTER: Cluster =
process.env.NEXT_APP_CLUSTER === "mainnet"
  ? "mainnet"
  : process.env.NEXT_APP_CLUSTER === "testnet"
  ? "testnet"
  : "devnet";

export const ETH_NETWORK_CHAIN_ID =
  CLUSTER === "mainnet" ? 1 : CLUSTER === "devnet" ? 5 : 1337;
export const ROPSTEN_ETH_NETWORK_CHAIN_ID =
  CLUSTER === "mainnet" ? 1 : CLUSTER === "devnet" ? 3 : 1337;
export const GOERLI_ETH_NETWORK_CHAIN_ID =
  CLUSTER === "mainnet" ? 1 : CLUSTER === "devnet" ? 5 : 1337;
export const BSC_NETWORK_CHAIN_ID =
  CLUSTER === "mainnet" ? 56 : CLUSTER === "devnet" ? 97 : 1397;
export const POLYGON_NETWORK_CHAIN_ID =
  CLUSTER === "mainnet" ? 137 : CLUSTER === "devnet" ? 80001 : 1381;
export const RINKEBY_ETH_NETWORK_CHAIN_ID =
  CLUSTER === "mainnet" ? 1 : CLUSTER === "devnet" ? 4 : 1337;

export const getEvmChainId = (chainId: ChainId) =>
  chainId === CHAIN_ID_ETH
    ? ETH_NETWORK_CHAIN_ID
    : chainId === CHAIN_ID_ETHEREUM_ROPSTEN
    ? ROPSTEN_ETH_NETWORK_CHAIN_ID
    : chainId === RINKEBY_ETH_NETWORK_CHAIN_ID
    ? RINKEBY_ETH_NETWORK_CHAIN_ID
    : chainId === CHAIN_ID_BSC
    ? BSC_NETWORK_CHAIN_ID
    : undefined;