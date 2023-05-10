/* eslint-disable max-lines */
/* eslint-disable max-statements */
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import i18next from 'i18next';

import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import { useCurrentApplication } from 'modules/BlockchainApplication/hooks/useCurrentApplication';
import { useApplicationSupportedTokensQuery } from 'modules/BlockchainApplication/api/useApplicationSupportedTokensQuery';
import { useAccountNonce } from 'modules/Accounts/hooks/useAccountNonce';
import { useInitializationFee } from 'modules/Transactions/hooks/useInitializationFee';
import useDryRunTransactionMutation from 'modules/Transactions/api/useDryRunTransactionMutation';
import useBroadcastTransactionMutation from 'modules/Transactions/api/useBroadcastTransactionMutation';
import { useMessageFee } from 'modules/Transactions/hooks/useMessageFee';
import { TRANSACTION_VERIFY_RESULT } from 'modules/Transactions/utils/constants';
import { decryptAccount } from 'modules/Auth/utils/decryptAccount';
import { getDryRunTransactionError } from 'modules/Transactions/utils/helpers';
import { useChainChannelQuery } from 'modules/BlockchainApplication/api/useChainChannelQuery';
import DropDownHolder from 'utilities/alert';
import { fromPathToObject } from 'utilities/helpers';
import { fromDisplayToBaseDenom } from 'utilities/conversions.utils';

export default function useSendTokenForm({ transaction, isTransactionSuccess, initialValues }) {
  const [currentAccount] = useCurrentAccount();

  const [currentApplication] = useCurrentApplication();

  const {
    data: applicationSupportedTokensData,
    isSuccess: isSuccessApplicationSupportedTokensData,
  } = useApplicationSupportedTokensQuery(currentApplication.data);

  const { data: messageFeeData } = useMessageFee();

  const { refetch: refetchAccountNonce } = useAccountNonce(currentAccount?.metadata?.address, {
    enabled: false,
  });

  const dryRunTransactionMutation = useDryRunTransactionMutation();

  const broadcastTransactionMutation = useBroadcastTransactionMutation();

  const defaultValues = useMemo(
    () => ({
      senderApplicationChainID: currentApplication.data?.chainID,
      recipientApplicationChainID:
        initialValues?.recipientApplicationChainID || currentApplication.data?.chainID,
      recipientAccountAddress: initialValues?.recipientAccountAddress,
      recipientAccountAddressFormat: initialValues?.recipientAccountAddressFormat || 'input',
      tokenID: initialValues?.tokenID,
      amount: initialValues?.amount ? parseFloat(initialValues.amount) : 0,
      message: initialValues?.message || '',
      priority: 'low',
      userPassword: '',
      command: 'transfer',
    }),
    [currentApplication.data?.chainID, initialValues]
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
      priority: yup.string().required(i18next.t('sendToken.errors.priority')),
    })
    .required();

  const { handleSubmit: baseHandleSubmit, ...form } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
    enableReinitialize: true,
  });

  const recipientApplicationChainID = form.watch('recipientApplicationChainID');
  const senderApplicationChainID = form.watch('senderApplicationChainID');
  const recipientAddress = form.watch('recipientAccountAddress');
  const tokenID = form.watch('tokenID');
  const token = applicationSupportedTokensData?.find((_token) => _token.tokenID === tokenID);
  const command = form.watch('command');

  const isCrossChainTransfer = senderApplicationChainID !== recipientApplicationChainID;

  const { data: recipientApplicationChainChannelData } = useChainChannelQuery(
    recipientApplicationChainID,
    { options: { enabled: isCrossChainTransfer } }
  );

  const { data: initializationFeeData, refetch: refetchInitializationFee } = useInitializationFee({
    address: recipientAddress,
    tokenID,
    enabled: false,
    isCrossChainTransfer,
  });

  const handleChange = (field, value, onChange) => {
    const [fieldPrefix, fieldSuffix] = field.split('.');

    const fieldName = fieldSuffix || fieldPrefix;

    if (form.formState.errors[fieldName]) {
      form.clearErrors(fieldName);
    }

    try {
      if (field === 'params.amount') {
        const amountInBaseDenom = fromDisplayToBaseDenom({
          amount: (value || 0).toString(),
          displayDenom: token.displayDenom,
          denomUnits: token.denomUnits,
        });

        transaction.update({ params: { amount: amountInBaseDenom } });
      } else {
        transaction.update(fromPathToObject(field, value));
      }

      onChange(value);
    } catch (error) {
      form.setError(fieldName, { type: 'custom', message: error.message });
    }
  };

  const handleSubmit = baseHandleSubmit(async (values) => {
    const accountNonceData = await refetchAccountNonce();

    if (accountNonceData) {
      transaction.update({ nonce: accountNonceData });
    }

    let privateKey;

    try {
      const decryptedAccount = await decryptAccount(currentAccount.crypto, values.userPassword);

      privateKey = decryptedAccount.privateKey;
    } catch (error) {
      DropDownHolder.error(i18next.t('Error'), i18next.t('auth.setup.decryptRecoveryPhraseError'));
    }

    if (privateKey) {
      try {
        const signedTransaction = await transaction.sign(privateKey);

        const encodedTransaction = transaction.encode(signedTransaction).toString('hex');

        dryRunTransactionMutation.mutate(
          { transaction: encodedTransaction },
          {
            onSettled: ({ data }) => {
              if (data.result !== TRANSACTION_VERIFY_RESULT.invalid) {
                broadcastTransactionMutation.mutate({ transaction: encodedTransaction });
              }
            },
          }
        );
      } catch (error) {
        DropDownHolder.error(
          i18next.t('Error'),
          i18next.t('transactions.errors.signErrorDescription')
        );
      }
    }
  });

  const handleReset = () => {
    dryRunTransactionMutation.reset();
    broadcastTransactionMutation.reset();
  };

  const handleMutationsReset = () => {
    dryRunTransactionMutation.reset();
    broadcastTransactionMutation.reset();
  };

  useEffect(() => {
    if (!isTransactionSuccess) {
      return;
    }

    if (applicationSupportedTokensData && !form.getValues('tokenID')) {
      const defaultTokenID = applicationSupportedTokensData[0]?.tokenID;

      if (defaultTokenID) {
        transaction.update({
          params: {
            tokenID: defaultTokenID,
          },
        });

        form.reset({
          ...defaultValues,
          tokenID: defaultTokenID,
        });
      }
    }
  }, [form, defaultValues, isTransactionSuccess, applicationSupportedTokensData, transaction]);

  useEffect(() => {
    if (isTransactionSuccess && isSuccessApplicationSupportedTokensData) {
      const amountInBaseDenom = token
        ? fromDisplayToBaseDenom({
            amount: defaultValues.amount,
            displayDenom: token.displayDenom,
            denomUnits: token.denomUnits,
          })
        : 0;

      transaction.update({
        params: {
          tokenID: defaultValues.tokenID,
          recipientAddress: defaultValues.recipientAccountAddress,
          amount: amountInBaseDenom,
          data: defaultValues.message,
        },
        priority: defaultValues.priority,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues, isTransactionSuccess, isSuccessApplicationSupportedTokensData]);

  useEffect(() => {
    if (!isTransactionSuccess) {
      return;
    }

    if (
      isCrossChainTransfer &&
      messageFeeData?.data?.fee &&
      recipientApplicationChainChannelData?.data?.messageFeeTokenID
    ) {
      // TODO: Fix the message fee computation based on bytes of the params
      const messageFee = BigInt(messageFeeData.data.fee) * BigInt(10 ** 5);
      transaction.update({
        command: 'transferCrossChain',
        params: {
          messageFee,
          messageFeeTokenID: recipientApplicationChainChannelData.data.messageFeeTokenID,
          receivingChainID: recipientApplicationChainID,
        },
      });

      form.setValue('command', 'transferCrossChain');
    } else if (transaction.command !== 'transfer') {
      transaction.update({ command: 'transfer' });
      transaction.deleteParams(['messageFee', 'receivingChainID', 'messageFeeTokenID']);

      form.setValue('command', 'transfer');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isCrossChainTransfer,
    recipientApplicationChainChannelData?.data?.messageFeeTokenID,
    messageFeeData?.data?.fee,
    recipientApplicationChainID,
    transaction,
    isTransactionSuccess,
  ]);

  useEffect(() => {
    if (!isTransactionSuccess) {
      return;
    }

    if (recipientAddress && tokenID) {
      refetchInitializationFee();
    }

    if (recipientAddress && tokenID && initializationFeeData !== undefined) {
      transaction.update({ extraCommandFee: initializationFeeData });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTransactionSuccess, tokenID, recipientAddress, initializationFeeData]);

  const isLoading =
    form.formState.isSubmitting ||
    dryRunTransactionMutation.isLoading ||
    broadcastTransactionMutation.isLoading;
  const isSuccess = broadcastTransactionMutation.isSuccess;
  const error =
    dryRunTransactionMutation.error ||
    (dryRunTransactionMutation.data?.data &&
      getDryRunTransactionError(dryRunTransactionMutation.data.data)) ||
    broadcastTransactionMutation.error;
  const isError = !!error;

  return {
    ...form,
    handleChange,
    handleSubmit,
    handleReset,
    broadcastTransactionMutation,
    dryRunTransactionMutation,
    handleMutationsReset,
    isLoading,
    isSuccess,
    error,
    isError,
    command,
  };
}
