// import {
//   assertIsDeliverTxSuccess,
// } from '@cosmjs/stargate'

import { useSelector } from "react-redux";
import { useCallback, useMemo, useState } from "react";
import { MsgSend } from "../bank-sdk/tx";
import { TxClient, MissingWalletError} from "./common"
import { useHumanProvider } from "../../contexts/HumanProviderContext"
import { 
  selectTransferAmount,
 } from '../../store/selectors';

export default function useSendToken() {
  const [txResult, setTransactionResult] = useState(false);
  const [txInrequest, setTxRequesting] = useState(false);
  const sourceAmount = useSelector(selectTransferAmount);

  const {
    humanAddress,
    humanSignerClient
  } = useHumanProvider();

  const sendMsgTokenSend = async (fee = [], memo = '') => {
    try {
      const client = await TxClient(humanSignerClient);

      let amount = parseFloat(sourceAmount);
      if (isNaN(amount)) {
          alert("Invalid amount");
          return false;
      }
  
      amount *= 1e6;
      amount = Math.floor(amount);
      const value: MsgSend = {
        from_address: humanAddress as string,
        to_address: process.env.NEXT_APP_HUMAN_POOL_ADDRESS as string,
        amount: [{
          denom: "uheart",
          amount: amount.toString(),
      }]
      };

      const msg = await client.msgSend(value)
      await client.signAndBroadcast([msg], { fee: { amount: fee, gas: "200000" }, memo })
      return true
    } catch (e: any) {
      if (e == MissingWalletError) {
        console.log('TxClient:MsgRequestTransaction:Init Could not initialize signing client. Wallet is required.')
      } else {
        console.log('TxClient:MsgRequestTransaction:Send Could not broadcast Tx: ' + e.message)
      }

      return false
    }
  }

  const handleSendToken = useCallback(async () => {
    setTxRequesting(true)
    const result = await sendMsgTokenSend();
    // assertIsDeliverTxSuccess(result);
    setTransactionResult(result);
    setTxRequesting(false)

    return result
  }, [txResult]);

  return useMemo(
    () => ({
      txInrequest, txResult, handleSendToken
    }),
    [
      txInrequest, txResult, handleSendToken
    ]
  );
}

