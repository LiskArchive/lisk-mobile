import { useSelector } from 'react-redux';

import { useApplicationsExplorer } from 'modules/BlockchainApplication/hooks/useApplicationsExplorer';
import { useApplicationSupportedTokensQuery } from 'modules/BlockchainApplication/api/useApplicationSupportedTokensQuery';
import useMessageFee from 'modules/Transactions/hooks/useMessageFee';
import { selectBookmarkList } from 'modules/Bookmark/store/selectors';
import { fromBaseToDisplayDenom } from 'utilities/conversions.utils';

export function useTransactionSummary({
  senderApplicationChainID,
  recipientApplicationChainID,
  recipientAccountAddress,
  tokenID,
  amount,
  message,
  priority,
  fee,
}) {
  const applications = useApplicationsExplorer();

  const bookmarks = useSelector(selectBookmarkList);

  const senderApplication = applications.data?.find(
    (application) => application.chainID === senderApplicationChainID
  );

  const recipientApplication = applications.data?.find(
    (application) => application.chainID === recipientApplicationChainID
  );

  const recipientAccount = bookmarks.find(
    (account) => account.address === recipientAccountAddress
  ) || { address: recipientAccountAddress, isNew: true };

  const { data: supportedTokensData } = useApplicationSupportedTokensQuery(recipientApplication);

  const token = supportedTokensData?.find((_token) => _token.tokenID === tokenID);

  const transactionFee =
    supportedTokensData &&
    fromBaseToDisplayDenom({
      amount: fee,
      displayDenom: token?.displayDenom,
      denomUnits: token?.denomUnits,
      symbol: token?.symbol,
      withSymbol: true,
    });

  const messageFee = useMessageFee({
    senderApplicationChainID,
    recipientApplicationChainID,
  });

  return {
    senderApplication,
    recipientApplication,
    recipientAccount,
    amount,
    message,
    token,
    priority,
    transactionFee,
    messageFee,
  };
}
