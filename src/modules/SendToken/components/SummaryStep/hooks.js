/* eslint-disable max-statements */
import { useCurrentAccount, useAccounts } from 'modules/Accounts/hooks/useAccounts';
import { useGetTokensQuery } from '../../api/useGetTokensQuery';
import useTransactionFeeCalculator from '../../hooks/useTransactionFeeCalculator';
import useInitializationFeeCalculator from '../../hooks/useInitializationFeeCalculator';
import useCCMFeeCalculator from '../../hooks/useCCMFeeCalculator';
import { useBlockchainApplicationExplorer } from '../../../BlockchainApplication/hooks/useBlockchainApplicationExplorer';

export function useSendTokenSummary({ form }) {
  const { applications } = useBlockchainApplicationExplorer();

  const [currentAccount] = useCurrentAccount();

  const { accounts } = useAccounts();

  const tokens = useGetTokensQuery(currentAccount.metadata.address);

  const senderApplicationChainID = form.watch('senderApplicationChainID');
  const recipientApplicationChainID = form.watch('recipientApplicationChainID');
  const recipientAccountAddress = form.watch('recipientAccountAddress');
  const tokenID = form.watch('tokenID');
  const amount = form.watch('amount');
  const message = form.watch('message');
  const priority = form.watch('priority');

  const senderApplication = applications?.data?.find(
    application => application.chainID === senderApplicationChainID
  );

  const recipientApplication = applications?.data?.find(
    application => application.chainID === recipientApplicationChainID
  );

  const recipientAccount = accounts.find(
    account => account.metadata.address === recipientAccountAddress
  );

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
    amount,
    priority,
    recipientAccountAddress,
  });

  const cmmFee = useCCMFeeCalculator();

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
