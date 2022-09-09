import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import i18next from 'i18next';

import { useCurrentBlockchainApplication } from 'modules/BlockchainApplication/hooks/useCurrentBlockchainApplication';
import useSendTokenMutation from '../api/useSendTokenMutation';
import { mockTokens } from '../__fixtures__';

export default function useSendTokenForm() {
  const [currentApplication] = useCurrentBlockchainApplication();

  const sendTokenMutation = useSendTokenMutation();

  const defaultValues = {
    senderApplicationChainID: currentApplication.chainID,
    recipientApplicationChainID: currentApplication.chainID,
    recipientAccountAddress: undefined,
    recipientAccountAddressFormat: undefined,
    tokenID: mockTokens.find(token => token.symbol === 'LSK')?.tokenID,
    amount: undefined,
    message: '',
    priority: 'low',
    userPassword: ''
  };

  const validationSchema = yup.object({
    senderApplicationChainID: yup.number().required(i18next.t('sendToken.errors.senderApplicationChainID')),
    recipientApplicationChainID: yup.number().required(i18next.t('sendToken.errors.recipientApplicationChainID')),
    recipientAccountAddress: yup.string().required(i18next.t('sendToken.errors.recipientAccountAddress')),
    tokenID: yup.string().required(i18next.t('sendToken.errors.tokenID')),
    amount: yup.number(i18next.t('sendToken.errors.amountMustBeNumber'))
      .required(i18next.t('sendToken.errors.amountRequired'))
      .positive(i18next.t('sendToken.errors.amountMustBePositive')),
    priority: yup.string().required(i18next.t('sendToken.errors.priority')),
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
