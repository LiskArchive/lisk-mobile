/* eslint-disable max-lines */
/* eslint-disable max-statements */
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import i18next from 'i18next';

import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import { useCurrentApplication } from 'modules/BlockchainApplication/hooks/useCurrentApplication';
import { useApplicationsExplorer } from 'modules/BlockchainApplication/hooks/useApplicationsExplorer';
import { useAccountNonce } from 'modules/Accounts/hooks/useAccountNonce';
import useDryRunTransactionMutation from 'modules/Transactions/api/useDryRunTransactionMutation';
import useBroadcastTransactionMutation from 'modules/Transactions/api/useBroadcastTransactionMutation';
import { useTransactionFees } from 'modules/Transactions/hooks/useTransactionFees';
import {
  TRANSACTION_VERIFY_RESULT,
  EVENT_DATA_RESULT,
  ERROR_EVENTS,
} from 'modules/Transactions/utils/constants';
import { decryptAccount } from 'modules/Auth/utils/decryptAccount';
import { getDryRunTransactionError } from 'modules/Transactions/utils/helpers';
import { useDebounce } from 'hooks/useDebounce';
import DropDownHolder from 'utilities/alert';
import { fromPathToObject } from 'utilities/helpers';
import { fromDisplayToBaseDenom } from 'utilities/conversions.utils';
import { BASE_TRANSACTION_MESSAGE_FEE } from '../constants';
import { useTransferableTokens } from '../../BlockchainApplication/api/useTransferableTokens';

export default function useSendTokenForm({ transaction, isTransactionSuccess, initialValues }) {
  const [currentAccount] = useCurrentAccount();

  const [dryRunError, setDryRunError] = useState(false);

  const [currentApplication] = useCurrentApplication();

  const applications = useApplicationsExplorer();

  const { refetch: refetchAccountNonce } = useAccountNonce(currentAccount?.metadata?.address, {
    enabled: false,
  });

  const dryRunTransactionMutation = useDryRunTransactionMutation();

  const broadcastTransactionMutation = useBroadcastTransactionMutation();

  const defaultValues = useMemo(
    () => ({
      senderApplicationChainID: currentApplication.data?.chainID,
      recipientApplicationChainID:
        initialValues?.recipientChain || currentApplication.data?.chainID,
      recipientAccountAddress: initialValues?.recipient,
      recipientAccountAddressFormat: initialValues?.recipientAccountAddressFormat || 'input',
      tokenID: initialValues?.token,
      amount: initialValues?.amount || 0,
      message: initialValues?.reference || '',
      priority: 'low',
      userPassword: '',
      command: 'transfer',
    }),
    [
      currentApplication.data?.chainID,
      initialValues?.token,
      initialValues?.amount,
      initialValues?.reference,
      initialValues?.recipientAccountAddressFormat,
      initialValues?.recipient,
      initialValues?.recipientChain,
    ]
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
  const command = form.watch('command');
  const amount = form.watch('amount');
  const message = form.watch('message');
  const debouncedMessage = useDebounce(message, 1000);

  const recipientApplication = applications.data?.find(
    (application) => application.chainID === recipientApplicationChainID
  );

  const {
    data: applicationSupportedTokensData,
    isSuccess: isSuccessApplicationSupportedTokensData,
  } = useTransferableTokens(recipientApplication);

  const token = applicationSupportedTokensData?.find((_token) => _token.tokenID === tokenID);

  const isCrossChainTransfer = senderApplicationChainID !== recipientApplicationChainID;

  const defaultTokenID = applicationSupportedTokensData[0]?.tokenID;

  const { isLoading: isLoadingTransactionFees, isError: isErrorTransactionFees } =
    useTransactionFees({
      transaction,
      isTransactionSuccess,
      dependencies: [recipientAddress, tokenID, amount, debouncedMessage, isCrossChainTransfer],
      enabled: recipientAddress && tokenID,
      onError: () =>
        DropDownHolder.error(i18next.t('Error'), i18next.t('sendToken.errors.estimateFees')),
    });

  const handleChange = (field, value, onChange) => {
    const [fieldPrefix, fieldSuffix] = field.split('.');

    const fieldName = fieldSuffix || fieldPrefix;

    if (form.formState.errors[fieldName]) {
      form.clearErrors(fieldName);
    }

    try {
      if (field === 'params.amount') {
        try {
          const amountInBaseDenom = fromDisplayToBaseDenom({
            amount: value,
            displayDenom: token.displayDenom,
            denomUnits: token.denomUnits,
          });

          transaction.update({ params: { amount: amountInBaseDenom } });
        } catch (error) {
          form.setError(fieldName, {
            type: 'custom',
            message: i18next.t('sendToken.errors.amountInvalid'),
          });
        }
      } else {
        transaction.update(fromPathToObject(field, value));
      }

      onChange(value);
    } catch (error) {
      form.setError(fieldName, { type: 'custom', message: error.message });
    }
  };

  const getEventDataResultError = (events) => {
    const event = events?.find((e) => e.data?.result && e.data?.result !== 0);

    if (event) {
      return EVENT_DATA_RESULT[event.data.result];
    }

    return i18next.t('transactions.errors.dryRunFailed');
  };

  const getDryRunErrors = (events) => {
    const event = events?.find((e) => ERROR_EVENTS[e.name]);

    if (event) {
      return ERROR_EVENTS[event.name];
    }

    return getEventDataResultError(events);
  };

  const executeDryRun = async ({
    dryRunTransaction,
    skipBroadcast = false,
    strict = false,
    skipVerify = false,
  }) => {
    return new Promise((resolve, reject) => {
      const encodedTransaction = transaction.encode(dryRunTransaction).toString('hex');
      dryRunTransactionMutation.mutate(
        { transaction: encodedTransaction, strict, skipVerify },
        {
          onSettled: ({ data }) => {
            const isOk = data?.result === TRANSACTION_VERIFY_RESULT.OK;
            if (!isOk) {
              if (data?.events) {
                const errorMessage = getDryRunErrors(data?.events);
                return reject(new Error(errorMessage));
              }
              if (data?.errorMessage) {
                return reject(new Error(data?.errorMessage));
              }
            }
            if (!skipBroadcast) {
              broadcastTransactionMutation.mutate({ transaction: encodedTransaction });
            }
            resolve();
          },
          onError: async (error) => {
            if (error?.json) {
              const errorJson = await error.json();
              reject(new Error(errorJson.message));
            }
            reject(new Error(error?.message));
          },
        }
      );
    });
  };

  const updateTransactionNounce = async () => {
    const accountNonceData = await refetchAccountNonce();
    if (accountNonceData) {
      transaction.update({ nonce: accountNonceData });
    }
  };

  const handleSubmit = baseHandleSubmit(async (values) => {
    let privateKey;

    try {
      await updateTransactionNounce();
      const decryptedAccount = await decryptAccount(currentAccount.crypto, values.userPassword);

      privateKey = decryptedAccount.privateKey;
    } catch (error) {
      DropDownHolder.error(i18next.t('Error'), i18next.t('auth.setup.decryptRecoveryPhraseError'));
      return;
    }

    try {
      const signedTransaction = await transaction.sign(privateKey);
      await executeDryRun({ dryRunTransaction: signedTransaction, strict: true });
    } catch (error) {
      setDryRunError(error.message);
    }
  });

  const handleContinue = async (onError) => {
    try {
      await updateTransactionNounce();
      await executeDryRun({
        dryRunTransaction: transaction.transaction,
        skipBroadcast: true,
        strict: false,
        skipVerify: true,
      });
      return true;
    } catch (error) {
      onError(error.message);
      return false;
    }
  };

  const handleReset = () => {
    dryRunTransactionMutation.reset();
    broadcastTransactionMutation.reset();
    setDryRunError();
  };

  const handleMutationsReset = () => {
    dryRunTransactionMutation.reset();
    broadcastTransactionMutation.reset();
    setDryRunError();
  };

  useEffect(() => {
    if (!isTransactionSuccess) {
      return;
    }

    if (applicationSupportedTokensData && !form.getValues('tokenID')) {
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
  }, [
    form,
    defaultValues,
    defaultTokenID,
    isTransactionSuccess,
    applicationSupportedTokensData,
    transaction,
  ]);

  useEffect(() => {
    if (isTransactionSuccess && isSuccessApplicationSupportedTokensData) {
      let amountInBaseDenom = 0;

      try {
        if (token) {
          amountInBaseDenom = fromDisplayToBaseDenom({
            amount: defaultValues.amount,
            displayDenom: token.displayDenom,
            denomUnits: token.denomUnits,
          });
        }
      } catch (error) {
        console.log(error);
      }

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

    if (isCrossChainTransfer) {
      transaction.update({
        command: 'transferCrossChain',
        params: {
          receivingChainID: recipientApplicationChainID,
          messageFee: BASE_TRANSACTION_MESSAGE_FEE,
          messageFeeTokenID: defaultTokenID,
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
    recipientApplicationChainID,
    transaction,
    defaultTokenID,
    isTransactionSuccess,
  ]);

  useEffect(() => {
    form.reset({
      ...defaultValues,
      recipientAccountAddress: initialValues?.recipient,
      recipientAccountAddressFormat: initialValues?.recipientAccountAddressFormat || 'input',
      tokenID: initialValues?.token,
      amount: initialValues?.amount,
      message: initialValues?.reference,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    initialValues?.token,
    initialValues?.amount,
    initialValues?.reference,
    initialValues?.recipientAccountAddressFormat,
    initialValues?.recipient,
    initialValues?.recipientChain,
  ]);

  const isLoading =
    form.formState.isSubmitting ||
    dryRunTransactionMutation.isLoading ||
    broadcastTransactionMutation.isLoading;

  const isSuccess = broadcastTransactionMutation.isSuccess;

  const error =
    dryRunError ||
    dryRunTransactionMutation.error ||
    (dryRunTransactionMutation.data?.data &&
      getDryRunTransactionError(dryRunTransactionMutation.data.data)) ||
    broadcastTransactionMutation.error;

  const isError = !!dryRunError || !!error;

  return {
    ...form,
    handleChange,
    handleSubmit,
    handleReset,
    handleMutationsReset,
    handleContinue,
    broadcastTransactionMutation,
    dryRunTransactionMutation,
    isLoading,
    isSuccess,
    error,
    isError,
    command,
    isLoadingTransactionFees: isLoadingTransactionFees || message !== debouncedMessage,
    isErrorTransactionFees,
  };
}
