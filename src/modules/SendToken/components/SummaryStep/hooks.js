/* eslint-disable max-statements */
import { useCurrentAccount, useAccounts } from 'modules/Accounts/hooks/useAccounts';
import { useBlockchainApplicationExplorer } from 'modules/BlockchainApplication/hooks/useBlockchainApplicationExplorer';
import { useGetTokensQuery } from '../../api/useGetTokensQuery';
import useTransactionFeeCalculator from '../../hooks/useTransactionFeeCalculator';
import useInitializationFeeCalculator from '../../hooks/useInitializationFeeCalculator';
import useCCMFeeCalculator from '../../hooks/useCCMFeeCalculator';

export function useSendTokenSummary({ form }) {
  const { applications } = useBlockchainApplicationExplorer();

  const [currentAccount] = useCurrentAccount();

  const { accounts } = useAccounts();

  const tokens = useGetTokensQuery(currentAccount.metadata.address);

  const senderApplicationChainID = form.watch('senderApplicationChainID');
  const recipientApplicationChainID = form.watch('recipientApplicationChainID');
  const recipientAccountAddress = form.watch('recipientAccountAddress');
  const tokenID = form.watch('tokenID');
  const amount = parseFloat(form.watch('amount'));
  const message = form.watch('message');
  const priority = form.watch('priority');

  const senderApplication = applications.data?.find(
    application => application.chainID === senderApplicationChainID
  );

  const recipientApplication = applications.data?.find(
    application => application.chainID === recipientApplicationChainID
  );

  const recipientAccount = accounts.find(
    account => account.metadata.address === recipientAccountAddress
  ) || { metadata: { address: recipientAccountAddress }, isNew: true };

  const token = tokens.data?.find(
    _token => _token.tokenID === tokenID
  );

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
    recipientApplicationChainID
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
    cmmFee
  };
}
