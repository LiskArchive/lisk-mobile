/* eslint-disable max-statements */
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import i18next from 'i18next';

import { useCurrentAccount } from 'modules/Accounts/hooks/useAccounts/useCurrentAccount';
import { useCurrentBlockchainApplication } from 'modules/BlockchainApplication/hooks/useCurrentBlockchainApplication';
import useSendTokenMutation from '../api/useSendTokenMutation';
import { mockTokensMeta } from '../__fixtures__';
import { decryptAccount } from '../../Auth/utils/decryptAccount';

export default function useSendTokenForm({ transaction, isLoadingTransaction }) {
  const [currentAccount] = useCurrentAccount();

  const [currentApplication] = useCurrentBlockchainApplication();

  const sendTokenMutation = useSendTokenMutation();

  console.log({ transaction });

  const defaultValues = useMemo(
    () => ({
      senderApplicationChainID: currentApplication.chainID,
      recipientApplicationChainID: currentApplication.chainID,
      recipientAccountAddress: 'lsk3ay4z7wqjczbo5ogcqxgxx23xyacxmycwxfh4d',
      recipientAccountAddressFormat: 'input',
      tokenID: mockTokensMeta.find((token) => token.symbol === 'LSK')?.tokenID,
      amount: 0,
      message: '',
      priority: 'low',
      userPassword: '',
    }),
    [currentApplication.chainID]
  );

  const validationSchema = yup
    .object({
      senderApplicationChainID: yup
        .number()
        .required(i18next.t('sendToken.errors.senderApplicationChainID')),
      recipientApplicationChainID: yup
        .number()
        .required(i18next.t('sendToken.errors.recipientApplicationChainID')),
      recipientAccountAddress: yup
        .string()
        .required(i18next.t('sendToken.errors.recipientAccountAddress')),
      tokenID: yup.string().required(i18next.t('sendToken.errors.tokenID')),
      amount: yup
        .number(i18next.t('sendToken.errors.amountMustBeNumber'))
        .required(i18next.t('sendToken.errors.amountRequired'))
        .positive(i18next.t('sendToken.errors.amountMustBePositive')),
      priority: yup.string().required(i18next.t('sendToken.errors.priority')),
    })
    .required();

  const { handleSubmit: baseHandleSubmit, ...form } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const handleChange = (field, value, onChange) => {
    try {
      transaction.update({ params: { [field]: value } });

      onChange(value);
    } catch (error) {
      console.log({ errorOnHandleSendTokenFieldChange: error });
    }
  };

  const handleSubmit = baseHandleSubmit(async (values) => {
    const { privateKey } = await decryptAccount(
      currentAccount.encryptedPassphrase,
      values.userPassword
    );

    try {
      // transaction.update({
      //   params: {
      //     amount: 100000000000,
      //     data: '',
      //     recipientAddress: 'lsk3ay4z7wqjczbo5ogcqxgxx23xyacxmycwxfh4d',
      //     tokenID: '0000000000000000',
      //   },
      // });

      const signedTransaction = await transaction.sign(privateKey);

      const encodedTransaction = transaction.encode(signedTransaction).toString('hex');

      sendTokenMutation.mutate({ transaction: encodedTransaction });
    } catch (error) {
      console.log({ errorOnSign: error });
    }
  });

  const handleReset = () => form.reset(defaultValues);

  useEffect(() => {
    if (isLoadingTransaction) return null;

    console.log('on effect', { isLoadingTransaction, defaultValues });

    return transaction.update({
      params: {
        tokenID: defaultValues.tokenID,
        recipientAddress: defaultValues.recipientAccountAddress,
        amount: defaultValues.amount,
        data: defaultValues.message,
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues, isLoadingTransaction]);

  return {
    ...form,
    handleChange,
    handleSubmit,
    handleReset,
    sendTokenMutation,
  };
}
