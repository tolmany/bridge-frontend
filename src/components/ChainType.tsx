import { ChainId, CHAIN_ID_ETH } from "../utils/consts";

const ChainType = ({ isOrigin, chainId, balance }: { isOrigin: boolean; chainId: ChainId; balance: number}) => {
  return (
    <>
      {
        isOrigin ? (
          <div className="from-card">
            <span>From:</span>
            {
              chainId == CHAIN_ID_ETH ? (
                <img src="./ethereum-logo.svg" alt="ethereum logo" />
              ) : (
                <img src="./h-logo.svg" alt="humans short logo" />
              )
            }
            <span className="subtitle">Blockchain</span>
            {
              chainId == CHAIN_ID_ETH ? (
                <>
                  <span className="title">Ethereum</span>
                  <span className="subtitle">{balance} $Heart</span>
                </>
              ) : (
                <>
                  <span className="title">Humans</span>
                  <span className="subtitle">{balance} $Heart</span>
                </>
                )
            }
          </div>
        ) : (
          <div className="to-card">
            <span>To:</span>
            {
              chainId == CHAIN_ID_ETH ? (
                <img src="./h-logo.svg" alt="humans short logo" />
              ) : (
                <img src="./ethereum-logo.svg" alt="ethereum logo" />
              )
            }
            <span className="subtitle">Blockchain</span>

            {
              chainId == CHAIN_ID_ETH ? (
                <>
                  <span className="title">Humans</span>
                  <span className="subtitle">{balance} $Heart</span>
                </>
              ) : (
                <>
                  <span className="title">Ethereum</span>
                  <span className="subtitle">{balance} $Heart</span>
                </>                
              )
            }
          </div>
        )
      }
    </>
  );
};

export default ChainType;
