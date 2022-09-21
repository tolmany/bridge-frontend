import { ChainId, CHAIN_ID_ETH } from "../utils/consts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

const ReviewChainType = ({ isFrom, chain, wallet }: { isFrom: boolean, chain: ChainId, wallet: string; }) => {
  const is0x = wallet?.startsWith("0x");

    return (
        <div className="d-flex gap-3">
            <div className="d-flex flex-column gap-2">
                <div className="">
                    <FontAwesomeIcon icon={faArrowRightToBracket} style={{ fontSize: 24 }} className="text-primary" />
                </div>
                <div>
                    {
                        chain == CHAIN_ID_ETH ? (
                            <img src="./ethereum-logo.svg" width={32} height={32} />
                        ) : (
                            <img src="./ethereum-logo.svg" width={32} height={32} />
                        )
                    }
                </div>
            </div>
            <div className="d-flex flex-column gap-2">
                {
                    isFrom ? (
                        <div>From:</div>
                    ) : (
                        <div>To:</div>
                    )
                }
                {
                    chain == CHAIN_ID_ETH ? (
                        <div className="smaller-title">Etherum Blockchain</div>
                    ) : (
                        <div className="smaller-title">Humans Blockchain</div>
                    )
                }
                
                <div className="wallet-address pl-4">{wallet?.substring(0, is0x ? 6 : 3)}...
                    {wallet?.substr(wallet?.length - (is0x ? 4 : 3))}</div>
            </div>
        </div>
    );
};

export default ReviewChainType;
