/* eslint-disable max-statements */
import { useSelector } from 'react-redux';
import * as Lisk from '@liskhq/lisk-client';

import { useBlockchainApplicationExplorer } from 'modules/BlockchainApplication/hooks/useBlockchainApplicationExplorer';
import { useApplicationSupportedTokensQuery } from 'modules/BlockchainApplication/api/useApplicationSupportedTokensQuery';
import useInitializationFeeCalculator from 'modules/Transactions/hooks/useInitializationFeeCalculator';
import useCCMFeeCalculator from 'modules/Transactions/hooks/useCCMFeeCalculator';
import { selectBookmarkList } from 'modules/Bookmark/store/selectors';

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
  const { applicationsMetadata } = useBlockchainApplicationExplorer();

  const bookmarks = useSelector(selectBookmarkList);

  const senderApplication = applicationsMetadata.data?.find(
    (application) => application.chainID === senderApplicationChainID
  );

  const recipientApplication = applicationsMetadata.data?.find(
    (application) => application.chainID === recipientApplicationChainID
  );

  const recipientAccount = bookmarks.find(
    (account) => account.address === recipientAccountAddress
  ) || { address: recipientAccountAddress, isNew: true };

  const { data: supportedTokensData } = useApplicationSupportedTokensQuery(recipientApplication);

  const token = supportedTokensData?.find((_token) => _token.tokenID === tokenID);

  const transactionFee = Lisk.transactions.convertBeddowsToLSK(fee.toString());

  const initializationFee = useInitializationFeeCalculator({
    recipientAccountAddress,
  });

  const cmmFee = useCCMFeeCalculator({
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
    initializationFee,
    cmmFee,
  };
}
