/* eslint-disable max-statements */
import { useSelector } from 'react-redux';

import { useApplicationsExplorer } from 'modules/BlockchainApplication/hooks/useApplicationsExplorer';
import { useApplicationSupportedTokensQuery } from 'modules/BlockchainApplication/api/useApplicationSupportedTokensQuery';
import { selectBookmarkList } from 'modules/Bookmark/store/selectors';
import { fromBaseToDisplayDenom, fromBeddowsToLsk } from 'utilities/conversions.utils';

export function useTransactionSummary(props) {
  const applications = useApplicationsExplorer();

  const bookmarks = useSelector(selectBookmarkList);

  const senderApplication = applications.data?.find(
    (application) => application.chainID === props.senderApplicationChainID
  );

  const recipientApplication = applications.data?.find(
    (application) => application.chainID === props.recipientApplicationChainID
  );

  const recipientAccount = bookmarks.find(
    (account) => account.address === props.recipientAccountAddress
  ) || { address: props.recipientAccountAddress, isNew: true };

  const { data: supportedTokensData } = useApplicationSupportedTokensQuery(recipientApplication);

  const token = supportedTokensData?.find((_token) => _token.tokenID === props.tokenID) || {
    tokenID: props.tokenID,
  };

  const transactionFee =
    token &&
    fromBaseToDisplayDenom({
      amount: props.fee,
      displayDenom: token.displayDenom,
      denomUnits: token.denomUnits,
      symbol: token.symbol,
      withSymbol: true,
    });

  const messageFee = props.messageFee && fromBeddowsToLsk(props.messageFee, true);

  return {
    senderApplication,
    recipientApplication,
    recipientAccount,
    amount: props.amount,
    message: props.message,
    token,
    priority: props.priority,
    transactionFee,
    messageFee,
  };
}
