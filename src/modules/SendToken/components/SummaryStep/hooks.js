/* eslint-disable max-statements */
import { useSelector } from 'react-redux';

import { useCurrentAccount } from 'modules/Accounts/hooks/useAccounts';
import { useBlockchainApplicationExplorer } from 'modules/BlockchainApplication/hooks/useBlockchainApplicationExplorer';
import { selectBookmarkList } from 'modules/Bookmark/store/selectors';
import { useAccountTokensQuery } from 'modules/Accounts/api/useAccountTokensQuery';
import useTransactionFeeCalculator from '../../hooks/useTransactionFeeCalculator';
import useInitializationFeeCalculator from '../../hooks/useInitializationFeeCalculator';
import useCCMFeeCalculator from '../../hooks/useCCMFeeCalculator';

export function useSendTokenSummary({ form }) {
  const { applicationsMetadata } = useBlockchainApplicationExplorer();

  const [currentAccount] = useCurrentAccount();

  const bookmarks = useSelector(selectBookmarkList);

  const tokens = useAccountTokensQuery(currentAccount.metadata.address);

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

  const token = tokens.data?.find((_token) => _token.tokenID === tokenID);

  const transactionFee = useTransactionFeeCalculator({
    tokenID,
    amount,
    priority,
    message,
  });

  const initializationFee = useInitializationFeeCalculator({
    tokenID,
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
