import { ChainId, CHAIN_ID_ETH } from "../utils/consts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

const TransactionLog = ({ isOrigin, chainId, wallet, txHash, amt }: { isOrigin: boolean; chainId: ChainId; wallet: string; txHash: string; amt: string; }) => {
    const is0x = wallet?.startsWith("0x");

    return (
        <>
            <div className="form-content d-flex flex-column flex-sm-row w-100 px-4 pt-4 pb-2 gap-3">
                <div className="d-flex gap-3 flex-fill">
                    <div className="d-flex flex-column gap-2">
                        <div className="">
                            <FontAwesomeIcon icon={faArrowRightToBracket} style={{ fontSize: 24 }} className="text-primary" />
                        </div>
                        <div>
                            {
                                isOrigin ? (
                                    <img src="./ethereum-logo.svg" width={32} height={32} />
                                ) : (
                                    <img src="./humans-logo.svg" width={32} height={32} />
                                )
                            }
                        </div>
                    </div>
                    <div className="d-flex flex-column gap-2">
                        {
                            isOrigin ? (
                                <div>From:</div>
                            ) : (
                                <div>To:</div>
                            )
                        }
                        {
                            chainId == CHAIN_ID_ETH ? (
                                <div className="smaller-title">Etherum Blockchain</div>
                            ) : (
                                <div className="smaller-title">Humans Blockchain</div>
                            )
                        }
                        <div className="wallet-address pl-4">{wallet?.substring(0, is0x ? 6 : 3)}...
                            {wallet?.substr(wallet?.length - (is0x ? 4 : 3))}</div>
                    </div>
                </div>
                <div className="d-flex gap-3 flex-fill pl-4 ml-big">
                    <div className="d-flex flex-column gap-1">
                        <div className="">Transferring:</div>
                        <div className="smaller-title">{amt} <span> $Heart</span></div>
                    </div>
                </div>
            </div>
            <div className="form-content px-4 pb-4">
                <div className="ml-big text-black">Transaction hash:</div>
                <div className="ml-big wallet-address text-break">{txHash}</div>
            </div>
        </>

    );
};

export default TransactionLog;
