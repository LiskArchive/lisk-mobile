/* eslint-disable no-undef */
/* eslint-disable max-statements */
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import i18next from 'i18next';
import * as Lisk from '@liskhq/lisk-client';

import { useCurrentAccount } from 'modules/Accounts/hooks/useAccounts/useCurrentAccount';
import { useCurrentBlockchainApplication } from 'modules/BlockchainApplication/hooks/useCurrentBlockchainApplication';
import useBroadcastTransactionMutation from 'modules/Transactions/api/useBroadcastTransactionMutation';
import useInitializationFeeCalculator from 'modules/Transactions/hooks/useInitializationFeeCalculator';
import useCCMFeeCalculator from 'modules/Transactions/hooks/useCCMFeeCalculator';
import { mockTokensMeta } from 'modules/Transactions/__fixtures__';
import { decryptAccount } from 'modules/Auth/utils/decryptAccount';
import DropDownHolder from 'utilities/alert';

export default function useSendTokenForm({ transaction, isTransactionSuccess, initialValues }) {
  const [currentAccount] = useCurrentAccount();

  const [currentApplication] = useCurrentBlockchainApplication();

  const broadcastTransactionMutation = useBroadcastTransactionMutation();

  const defaultValues = useMemo(
    () => ({
      senderApplicationChainID: currentApplication.chainID,
      recipientApplicationChainID:
        initialValues.recipientApplicationChainID || currentApplication.chainID,
      recipientAccountAddress: initialValues.recipientAccountAddress || '',
      recipientAccountAddressFormat: 'input',
      tokenID:
        initialValues.tokenID || mockTokensMeta.find((token) => token.symbol === 'LSK')?.tokenID,
      amount: initialValues.amount ? parseFloat(initialValues.amount) : 0,
      message: initialValues.message || '',
      priority: 'low',
      userPassword: '',
    }),
    [currentApplication.chainID, initialValues]
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

  const initializationFee = useInitializationFeeCalculator({
    recipientAccountAddress: form.watch('recipientAccountAddress'),
  });

  const cmmFee = useCCMFeeCalculator({
    senderApplicationChainID: form.watch('senderApplicationChainID'),
    recipientApplicationChainID: form.watch('recipientApplicationChainID'),
  });

  const handleChange = (field, value, onChange) => {
    if (field === 'params.amount') {
      const amountInBeddows = Lisk.transactions.convertLSKToBeddows(value.toString());

      transaction.update({ params: { amount: amountInBeddows } });
    } else {
      transaction.update({ [field]: value });
    }

    onChange(value);
  };

  const handleSubmit = baseHandleSubmit(async (values) => {
    let privateKey;

    try {
      const decryptedAccount = await decryptAccount(
        currentAccount.encryptedPassphrase,
        values.userPassword
      );

      privateKey = decryptedAccount.privateKey;
    } catch (error) {
      DropDownHolder.error(i18next.t('Error'), i18next.t('auth.setup.decryptPassphraseError'));
    }

    if (privateKey) {
      try {
        let extraFee = BigInt(0);

        if (initializationFee.data > 0) extraFee += initializationFee.data;

        if (cmmFee.data > 0) extraFee += cmmFee.data;

        if (extraFee) transaction.computeFee(extraFee);

        const signedTransaction = await transaction.sign(privateKey);

        const encodedTransaction = transaction.encode(signedTransaction).toString('hex');

        broadcastTransactionMutation.mutate({ transaction: encodedTransaction });
      } catch (error) {
        DropDownHolder.error(
          i18next.t('Error'),
          'Unable to sign your transaction. Please try again.'
        );
      }
    }
  });

  const handleReset = () => form.reset(defaultValues);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isTransactionSuccess) {
      return transaction.update({
        params: {
          tokenID: defaultValues.tokenID,
          recipientAddress: defaultValues.recipientAccountAddress,
          amount: defaultValues.amount,
          data: defaultValues.message,
        },
        priority: defaultValues.priority,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues, isTransactionSuccess]);

  return {
    ...form,
    handleChange,
    handleSubmit,
    handleReset,
    broadcastTransactionMutation,
  };
}
