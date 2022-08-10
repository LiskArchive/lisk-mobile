import { useForm } from 'react-hook-form';

import { useCurrentBlockchainApplication } from 'modules/BlockchainApplication/hooks/useCurrentBlockchainApplication';
import { useCurrentAccount } from 'modules/Accounts/hooks/useAccounts';
import { TOKENS_MOCK } from '../mocks';

export default function useSendTokenForm() {
  const [currentApplication] = useCurrentBlockchainApplication();
  const [currentAccount] = useCurrentAccount();

  const { handleSubmit: baseHandleSubmit, ...form } = useForm({
    defaultValues: {
      senderApplicationChainID: currentApplication.chainID,
      recipientApplicationChainID: '',
      recipientAccountAddress: currentAccount.metadata.address,
      tokenID: TOKENS_MOCK.find(token => token.symbol === 'LSK')?.tokenID,
      amount: 0,
      message: '',
      priority: 'low',
      fee: 0,
    }
  });

  const handleSubmit = baseHandleSubmit((values) => {
    console.log({ values });
  });

  return { ...form, handleSubmit };
}
