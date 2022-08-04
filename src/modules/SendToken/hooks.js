import { useForm } from 'react-hook-form';

import { useCurrentBlockchainApplication } from '../BlockchainApplication/hooks/useCurrentBlockchainApplication';

export function useSendTokenForm() {
  const [currentApplication] = useCurrentBlockchainApplication();

  const { handleSubmit: baseHandleSubmit, ...form } = useForm({
    defaultValues: {
      senderApplicationChainID: currentApplication.chainID,
      recipientApplicationChainID: '',
    }
  });

  const handleSubmit = baseHandleSubmit((values) => {
    console.log({ values });
  });

  return { ...form, handleSubmit };
}
