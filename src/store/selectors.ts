import { RootState } from ".";

/*
 * Transfer
 */

export const selectTransferActiveStep = (state: RootState) =>
  state.transfer.activeStep;
export const selectTransferOriginChain = (state: RootState) =>
  state.transfer.originChain;
export const selectSourceWalletAddress = (state: RootState) =>
  state.transfer.sourceWalletAddress;
export const selectTransferAmount = (state: RootState) => state.transfer.amount;
export const selectHumanAddress = (state: RootState) => state.transfer.humanAddress;
export const selectHumanClient = (state: RootState) => state.transfer.humanClient;
export const selectTransferTargetChain = (state: RootState) =>
  state.transfer.targetChain;
export const selectTransferTargetAddressHex = (state: RootState) =>
  state.transfer.targetAddressHex;
export const selectTransferTransferTx = (state: RootState) =>
  state.transfer.transferTx;
export const selectTransferIsSending = (state: RootState) =>
  state.transfer.isSending;
export const selectTransferIsApproving = (state: RootState) =>
  state.transfer.isApproving;
export const selectOriginSentTxHash = (state: RootState) =>
  state.transfer.originSentTxHash;
export const selectTargetSentTxHash = (state: RootState) =>
  state.transfer.targetSentTxHash;

export const selectTransferSourceError = (
  state: RootState
): string | undefined => {
  if (!state.transfer.originChain) {
    return "Select a source chain";
  }
  if (!state.transfer.amount) {
    return "Enter an amount";
  }

  return undefined;
};
export const selectTransferIsSourceComplete = (state: RootState) =>
  !selectTransferSourceError(state);
export const UNREGISTERED_ERROR_MESSAGE =
  "Target asset unavailable. Is the token registered?";
export const selectTransferTargetError = (state: RootState) => {
  const sourceError = selectTransferSourceError(state);
  if (sourceError) {
    return `Error in source: ${sourceError}`;
  }
  if (!state.transfer.targetChain) {
    return "Select a target chain";
  }
  if (state.transfer.originChain === state.transfer.targetChain) {
    return "Select a different target and source";
  }
};
export const selectTransferIsTargetComplete = (state: RootState) =>
  !selectTransferTargetError(state);