
const ToggleConnectedButton = ({
    connect,
    disconnect,
    connected,
    pk,
    walletIcon,
    title,
}: {
    connect(): any;
    disconnect(): any;
    connected: boolean;
    pk: string;
    walletIcon?: string;
    title: string;
}) => {
    const is0x = pk?.startsWith("0x");
    return connected ? (
        <button className="btn btn-gri w-100 mt-3" type="button" onClick={disconnect}>
            Disconnect {pk?.substring(0, is0x ? 6 : 3)}...
            {pk?.substr(pk?.length - (is0x ? 4 : 3))}
        </button>
    ) : (
        <button className="btn btn-gri w-100 mt-3" type="button" onClick={connect}>
           {title}
        </button>
    );
};

export default ToggleConnectedButton;
