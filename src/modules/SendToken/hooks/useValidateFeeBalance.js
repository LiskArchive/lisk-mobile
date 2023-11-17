import { useAccountTokenBalancesQuery } from '../../Accounts/api/useAccountTokenBalancesQuery';

export const useValidateFeeBalance = (address, customFeeTokenId) => {
  const tokenBalances = useAccountTokenBalancesQuery(address);

  const foundTokenBalance = tokenBalances.data?.data?.some(
    (tokenBalance) =>
      tokenBalance?.tokenID === customFeeTokenId &&
      BigInt(tokenBalance?.availableBalance || 0) > BigInt(0)
  );

  return {
    hasSufficientBalanceForFee: !!foundTokenBalance,
  };
};
