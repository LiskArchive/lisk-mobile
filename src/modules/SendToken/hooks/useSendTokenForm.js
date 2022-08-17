import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useCurrentBlockchainApplication } from 'modules/BlockchainApplication/hooks/useCurrentBlockchainApplication';
import { useCurrentAccount } from 'modules/Accounts/hooks/useAccounts';
import useSendTokenMutation from '../api/useSendTokenMutation';
import { TOKENS_MOCK } from '../mocks';

export default function useSendTokenForm() {
  const [currentApplication] = useCurrentBlockchainApplication();
  const [currentAccount] = useCurrentAccount();

  const sendTokenMutation = useSendTokenMutation();

  const defaultValues = {
    senderApplicationChainID: currentApplication.chainID,
    recipientApplicationChainID: undefined,
    recipientAccountAddress: currentAccount.metadata.address,
    tokenID: TOKENS_MOCK.find(token => token.symbol === 'LSK')?.tokenID,
    amount: 0,
    message: '',
    priority: 'low',
    userPassword: ''
  };

  const validationSchema = yup.object({
    senderApplicationChainID: yup.number().required('Application to send from must be specified'),
    recipientApplicationChainID: yup.number().required('Application who receives the tokens must be specified'),
    recipientAccountAddress: yup.string().required('Recipient account must be specified'),
    tokenID: yup.string().required('Token to send must be specified'),
    amount: yup.number().required('Token amount is required').positive('Token amount must be a positive number'),
    priority: yup.string().required('Priority must be specified'),
  }).required();

  const { handleSubmit: baseHandleSubmit, ...form } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema)
  });

  const handleSubmit = baseHandleSubmit(values => {
    console.log({ values });

    // TODO: Handle TX sign here.
    const transaction = '123lk1j23lk12j3l12kj3';

    sendTokenMutation.mutate(
      { transaction },
    );
  });

  const handleReset = () => form.reset(defaultValues);

  return {
    ...form, handleSubmit, handleReset, sendTokenMutation
  };
}
