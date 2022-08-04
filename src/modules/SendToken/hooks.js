import { useForm } from 'react-hook-form';

import { useCurrentBlockchainApplication } from 'modules/BlockchainApplication/hooks/useCurrentBlockchainApplication';
import { useCurrentAccount } from 'modules/Accounts/hooks/useAccounts';

export function useSendTokenForm() {
  const [currentApplication] = useCurrentBlockchainApplication();
  const [currentAccount] = useCurrentAccount();

  const { handleSubmit: baseHandleSubmit, ...form } = useForm({
    defaultValues: {
      senderApplicationChainID: currentApplication.chainID,
      recipientApplicationChainID: '',
      recipientAccountAddress: currentAccount.metadata.address
    }
  });

  const handleSubmit = baseHandleSubmit((values) => {
    console.log({ values });
  });

  return { ...form, handleSubmit };
}
