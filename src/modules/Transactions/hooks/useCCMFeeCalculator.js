/* eslint-disable no-undef */
// TODO: Implement real calculation business logic.
export default function useCCMFeeCalculator({
  senderApplicationChainID,
  recipientApplicationChainID,
}) {
  // TODO: Fetch this data from service once endpoint is available.
  const cmmFeeData = BigInt(0);
  const isCMMFeeLoading = false;
  const isCMMFeeSuccess = false;
  const errorOnCMMFee = undefined;

  const isCCMFee = senderApplicationChainID !== recipientApplicationChainID;

  return {
    data: isCCMFee ? cmmFeeData : BigInt(0),
    isLoading: isCMMFeeLoading,
    error: errorOnCMMFee,
    isSuccess: isCMMFeeSuccess,
  };
}
