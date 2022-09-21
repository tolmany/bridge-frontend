import {
  ChainId,
  CHAIN_ID_ETH,
  CHAIN_ID_HUMAN,
} from "../utils/consts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const LAST_STEP = 3;

type Steps = 0 | 1 | 2 | 3;

export interface Transaction {
  id: string;
  block: number;
}

export interface TransferState {
  activeStep: Steps;
  originChain: ChainId;
  sourceWalletAddress: string | undefined;
  amount: string;
  targetChain: ChainId;
  targetAddressHex: string | undefined;
  transferTx: Transaction | undefined;
  isSending: boolean;
  isApproving: boolean;
  humanAddress: string;
  humanClient: any;
  originSentTxHash: string | undefined;
  targetSentTxHash: string | undefined;
}

const initialState: TransferState = {
  humanAddress: "",
  humanClient: null,
  activeStep: 0,
  originChain: CHAIN_ID_ETH,
  sourceWalletAddress: undefined,
  amount: "",
  targetChain: CHAIN_ID_HUMAN,
  targetAddressHex: undefined,
  transferTx: undefined,
  isSending: false,
  isApproving: false,
  originSentTxHash: "",
  targetSentTxHash: "",
};

export const transferSlice = createSlice({
  name: "transfer",
  initialState,
  reducers: {
    incrementStep: (state) => {
      if (state.activeStep < LAST_STEP) state.activeStep++;
    },
    decrementStep: (state) => {
      if (state.activeStep > 0) state.activeStep--;
    },
    setStep: (state, action: PayloadAction<Steps>) => {
      state.activeStep = action.payload;
    },
    setOriginChain: (state, action: PayloadAction<ChainId>) => {
      const prevSourceChain = state.originChain;
      // clear targetAsset so that components that fire before useFetchTargetAsset don't get stale data
      state.targetAddressHex = undefined;
      state.originChain = action.payload;
      if (state.targetChain === action.payload) {
        state.targetChain = prevSourceChain;
      }
    },
    setSourceWalletAddress: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.sourceWalletAddress = action.payload;
    },
    setAmount: (state, action: PayloadAction<string>) => {
      state.amount = action.payload;
    },
    setTargetChain: (state, action: PayloadAction<ChainId>) => {
      const prevTargetChain = state.targetChain;
      state.targetChain = action.payload;
      state.targetAddressHex = undefined;
      // clear targetAsset so that components that fire before useFetchTargetAsset don't get stale data
      if (state.originChain === action.payload) {
        state.originChain = prevTargetChain;
        state.activeStep = 0;
      }
    },
    setTargetAddressHex: (state, action: PayloadAction<string | undefined>) => {
      state.targetAddressHex = action.payload;
    },
    setTransferTx: (state, action: PayloadAction<Transaction>) => {
      state.transferTx = action.payload;
    },
    setIsSending: (state, action: PayloadAction<boolean>) => {
      state.isSending = action.payload;
    },
    setIsApproving: (state, action: PayloadAction<boolean>) => {
      state.isApproving = action.payload;
    },
    setHumanAddress: (state, action: PayloadAction<string>) => {
      state.humanAddress = action.payload;
    },
    setHumanClient: (state, action: PayloadAction<any>) => {
      state.humanClient = action.payload;
    },
    setOriginSentTxHash: (state, action: PayloadAction<any>) => {
      state.originSentTxHash = action.payload;
    },
    setTargetSentTxHash: (state, action: PayloadAction<any>) => {
      state.targetSentTxHash = action.payload;
    },
    reset: (state) => ({
      ...initialState,
      originChain: state.originChain,
      targetChain: state.targetChain,
    }),
    setRecoveryVaa: (
      state,
      action: PayloadAction<{
        vaa: any;
        useRelayer: boolean;
        parsedPayload: {
          targetChain: ChainId;
          targetAddress: string;
          originChain: ChainId;
          originAddress: string;
          amount: string;
        };
      }>
    ) => {
      const prevTargetChain = state.targetChain;
      state.targetChain = action.payload.parsedPayload.targetChain;
      if (state.originChain === action.payload.parsedPayload.targetChain) {
        state.originChain = prevTargetChain;
      }
      // clear targetAsset so that components that fire before useFetchTargetAsset don't get stale data
      state.targetAddressHex = action.payload.parsedPayload.targetAddress;
      state.originChain = action.payload.parsedPayload.originChain;
      state.amount = action.payload.parsedPayload.amount;
      state.activeStep = 3;
    },
  },
});

export const {
  incrementStep,
  decrementStep,
  setStep,
  setOriginChain,
  setSourceWalletAddress,
  setAmount,
  setTargetChain,
  setTargetAddressHex,
  setTransferTx,
  setIsSending,
  setIsApproving,
  setHumanAddress,
  setHumanClient,
  reset,
  setRecoveryVaa,
  setOriginSentTxHash,
  setTargetSentTxHash,
} = transferSlice.actions;

export default transferSlice.reducer;
