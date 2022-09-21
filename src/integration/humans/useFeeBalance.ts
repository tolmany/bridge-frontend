import { useEffect, useMemo, useState } from "react";

export default function useFeeBalance() {
  const [ethereumFeeBalance, setEthereumFeeBalance] = useState("");
  const [humanFeeBalance, setHumanFeeBalance] = useState("");

  let interval: any;

  // const Diversifi_Node1 = "18.234.18.234"
  const Diversifi_Node1 = process.env.NEXT_APP_Humans_Node_Provider1_Query;

  const fetchFeeBalance = async () => {
    fetch(
      "https://" +
        Diversifi_Node1 +
        "/humansdotai/humans/humans/fee_balance",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setHumanFeeBalance("0");
        setEthereumFeeBalance("0");
        data.feeBalance.forEach((f:any) => {
          if (f.chainName == "Human") {
            setHumanFeeBalance("" + parseFloat(f.balance));
          } 

          if (f.chainName == "Ethereum") {
            setEthereumFeeBalance("" + parseFloat(f.balance));
          }
        }); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchFeeBalance();
    if (interval != undefined) {
      clearInterval(interval);
    }
    interval = setInterval(() => {
      fetchFeeBalance();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return useMemo(
    () => ({
      humanFeeBalance,
      ethereumFeeBalance,
    }),
    [humanFeeBalance, ethereumFeeBalance]
  );
}
