/* eslint-disable no-undef */

// TODO: Implement real calculation business logic when service implementation is ready.
// (details on https://github.com/LiskHQ/lisk-mobile/issues/1642).
export default function useMessageFee({ senderApplicationChainID, recipientApplicationChainID }) {
  // TODO: Fetch this data from service once endpoint is available.
  const data = BigInt(0);
  const isLoading = false;
  const isSuccess = false;
  const error = undefined;

  const isFeeApplicable = senderApplicationChainID !== recipientApplicationChainID;

  return {
    data: isFeeApplicable ? data : BigInt(0),
    isLoading,
    error,
    isSuccess,
  };
}
