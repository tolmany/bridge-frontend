import { SigningStargateClient, StdFee } from "@cosmjs/stargate";

import {
  Registry,
  DirectSecp256k1HdWallet,
  OfflineSigner,
  EncodeObject,
} from "@cosmjs/proto-signing";

import { MsgRequestTransaction } from "../humans-sdk/tx";
import { MsgTranfserPoolcoin } from "../humans-sdk/tx";
import { MsgKeysignVote } from "../humans-sdk/tx";
import { MsgApproveTransaction } from "../humans-sdk/tx";
import { MsgObservationVote } from "../humans-sdk/tx";
import { MsgUpdateBalance } from "../humans-sdk/tx";

import { MsgMultiSend } from "../bank-sdk/tx";
import { MsgSend } from "../bank-sdk/tx";

import { useSelector } from "react-redux";

interface TxClientOptions {
  addr: string;
}

const defaultFee = {
  amount: [],
  gas: "200000",
};

interface SignAndBroadcastOptions {
  fee: StdFee;
  memo?: string;
}

const types = [
  ["/humansdotai.humans.humans.MsgRequestTransaction", MsgRequestTransaction],
  ["/humansdotai.humans.humans.MsgTranfserPoolcoin", MsgTranfserPoolcoin],
  ["/humansdotai.humans.humans.MsgKeysignVote", MsgKeysignVote],
  ["/humansdotai.humans.humans.MsgApproveTransaction", MsgApproveTransaction],
  ["/humansdotai.humans.humans.MsgObservationVote", MsgObservationVote],
  ["/humansdotai.humans.humans.MsgUpdateBalance", MsgUpdateBalance],

  ["/cosmos.bank.v1beta1.MsgMultiSend", MsgMultiSend],
  ["/cosmos.bank.v1beta1.MsgSend", MsgSend],
];

export const Humans_Node1 = process.env.NEXT_APP_Humans_Node_Provider1;
export const MissingWalletError = new Error("wallet is required");
export const registry = new Registry(<any>types);

export const CalcFee = () => {
  const sendAmount = 1000; // Should be amount from external.....

  if (+sendAmount < 10 ) return 1;
  if (+sendAmount < 100 ) return 2;
  if (+sendAmount < 500 ) return 5;

  return 10;
}

export const TxClient = async (
  wallet: OfflineSigner,
  { addr: addr }: TxClientOptions = { addr: "https://" + Humans_Node1 }
) => {

  if (!wallet) throw MissingWalletError;
  let client: any;
  if (addr) {
    client = await SigningStargateClient.connectWithSigner(addr, wallet, {
      registry,
    });
  } else {
    client = await SigningStargateClient.offline(wallet, { registry });
  }
  const { address } = (await wallet.getAccounts())[0];

  return {
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }: SignAndBroadcastOptions = {fee: defaultFee, memo: ""}) => client.signAndBroadcast(address, msgs, fee,memo),
    msgRequestTransaction: (data: MsgRequestTransaction): EncodeObject => ({ typeUrl: "/humansdotai.humans.humans.MsgRequestTransaction", value: MsgRequestTransaction.fromPartial( data ) }),
    msgTranfserPoolcoin: (data: MsgTranfserPoolcoin): EncodeObject => ({ typeUrl: "/humansdotai.humans.humans.MsgTranfserPoolcoin", value: MsgTranfserPoolcoin.fromPartial( data ) }),
    msgKeysignVote: (data: MsgKeysignVote): EncodeObject => ({ typeUrl: "/humansdotai.humans.humans.MsgKeysignVote", value: MsgKeysignVote.fromPartial( data ) }),
    msgApproveTransaction: (data: MsgApproveTransaction): EncodeObject => ({ typeUrl: "/humansdotai.humans.humans.MsgApproveTransaction", value: MsgApproveTransaction.fromPartial( data ) }),
    msgObservationVote: (data: MsgObservationVote): EncodeObject => ({ typeUrl: "/humansdotai.humans.humans.MsgObservationVote", value: MsgObservationVote.fromPartial( data ) }),
    msgUpdateBalance: (data: MsgUpdateBalance): EncodeObject => ({ typeUrl: "/humansdotai.humans.humans.MsgUpdateBalance", value: MsgUpdateBalance.fromPartial( data ) }),
    msgMultiSend: (data: MsgMultiSend): EncodeObject => ({ typeUrl: "/cosmos.bank.v1beta1.MsgMultiSend", value: MsgMultiSend.fromPartial( data ) }),
    msgSend: (data: MsgSend): EncodeObject => ({ typeUrl: "/cosmos.bank.v1beta1.MsgSend", value: MsgSend.fromPartial( data ) }),
    
  };
};
