/* eslint-disable max-statements */
import { useSelector } from 'react-redux';
import * as Lisk from '@liskhq/lisk-client';

import { useBlockchainApplicationExplorer } from 'modules/BlockchainApplication/hooks/useBlockchainApplicationExplorer';
import { useApplicationSupportedTokensQuery } from 'modules/BlockchainApplication/api/useApplicationSupportedTokensQuery';
import useInitializationFeeCalculator from 'modules/Transactions/hooks/useInitializationFeeCalculator';
import useCCMFeeCalculator from 'modules/Transactions/hooks/useCCMFeeCalculator';
import { selectBookmarkList } from 'modules/Bookmark/store/selectors';

export function useSendTokenSummary({ form, transaction }) {
  const { applicationsMetadata } = useBlockchainApplicationExplorer();

  const bookmarks = useSelector(selectBookmarkList);

  const senderApplicationChainID = form.watch('senderApplicationChainID');
  const recipientApplicationChainID = form.watch('recipientApplicationChainID');
  const recipientAccountAddress = form.watch('recipientAccountAddress');
  const tokenID = form.watch('tokenID');
  const amount = parseFloat(form.watch('amount'));
  const message = form.watch('message');
  const priority = form.watch('priority');

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

  const transactionFee = Lisk.transactions.convertBeddowsToLSK(
    transaction.data.transaction.fee.toString()
  );

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
