/* eslint-disable complexity */
/* eslint-disable max-statements */
import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useController } from 'react-hook-form';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { useApplicationsExplorer } from 'modules/BlockchainApplication/hooks/useApplicationsExplorer';
import { useApplicationSupportedTokensQuery } from 'modules/BlockchainApplication/api/useApplicationSupportedTokensQuery';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { useSendTokenAmountChecker } from 'modules/SendToken/hooks/useSendTokenAmountChecker';

import getSendTokenSelectTokenStepStyles from './styles';
import {
  SendTokenMessageField,
  SendTokenPriorityField,
  SendTokenTransactionFeesLabels,
  SendTokenAmountField,
  TokenSelectField,
} from './components';
import { useModal } from '../../../../hooks/useModal';
import SignTransactionError from '../../../Transactions/components/SignTransaction/SignTransactionError';

export default function SendTokenSelectTokenStep({ nextStep, isValidAddress, form, transaction }) {
  const applications = useApplicationsExplorer();
  const navigation = useNavigation();

  const modal = useModal();

  const { field: tokenIDField } = useController({
    name: 'tokenID',
    control: form.control,
  });

  const { field: amountField } = useController({
    name: 'amount',
    control: form.control,
  });

  const { field: messageField } = useController({
    name: 'message',
    control: form.control,
  });

  const { field: priorityField } = useController({
    name: 'priority',
    control: form.control,
  });

  const { field: recipientApplicationChainIDField } = useController({
    name: 'recipientApplicationChainID',
    control: form.control,
  });

  const { styles } = useTheme({
    styles: getSendTokenSelectTokenStepStyles(),
  });

  const recipientApplication = applications?.data.find(
    (application) => application.chainID === recipientApplicationChainIDField.value
  );

  const { data: tokensData } = useApplicationSupportedTokensQuery(recipientApplication);

  const { isMaxAllowedAmountExceeded, isAmountValid } = useSendTokenAmountChecker({
    recipientApplication,
    selectedTokenID: tokenIDField.value,
    amount: amountField.value,
    transactionFee: transaction?.data?.transaction?.fee,
  });

  const isMessageInvalid = messageField.value?.length > 64;

  const feeTokenID = transaction?.data.feeTokenID;

  const selectedToken = tokensData?.find((token) => token.tokenID === feeTokenID);

  const tokenName = selectedToken?.tokenName ?? '';

  const showErrorModal = (error) => {
    let isInsufficientToken = false;
    if (typeof error === 'string' && error.includes('insufficient')) {
      isInsufficientToken = true;
    }

    modal.open(() => (
      <SignTransactionError
        onClick={form.handleReset}
        actionButton={
          <PrimaryButton
            key="retry"
            onClick={() => {
              if (isInsufficientToken) {
                navigation.navigate('Request');
              }
              modal.close();
            }}
            title={
              isInsufficientToken
                ? `${i18next.t('Request')} ${tokenName.toUpperCase()}`
                : i18next.t('sendToken.result.error.retryButtonText')
            }
            style={[styles.tryAgainButton]}
          />
        }
        description={
          isInsufficientToken
            ? i18next.t('transactions.errors.insufficientFeeDescription', {
                message: tokenName.toUpperCase(),
              })
            : null
        }
        title={i18next.t(error, { message: tokenName.toUpperCase() })}
        hideReport={isInsufficientToken}
      />
    ));
  };

  const disableNextStepButton =
    !isValidAddress ||
    isMaxAllowedAmountExceeded ||
    !isAmountValid ||
    !!form.formState.errors.amount?.message ||
    form.isLoadingTransactionFees ||
    form.isErrorTransactionFees ||
    isMessageInvalid;

  const verifyFormWithDryRun = async () => {
    let dryRunResult = await form.handleContinue(showErrorModal);
    if (dryRunResult) {
      form.handleReset();
      nextStep();
    }
  };

  return (
    <View style={[styles.container]}>
      <TokenSelectField
        value={tokenIDField.value}
        onChange={(value) => form.handleChange('params.tokenID', value, tokenIDField.onChange)}
        errorMessage={form.formState.errors.tokenID?.message}
        recipientApplication={recipientApplication}
        style={{ toggle: { container: { marginBottom: 16 } } }}
      />

      <SendTokenAmountField
        value={amountField.value}
        onChange={(value) => form.handleChange('params.amount', value, amountField.onChange)}
        tokenID={tokenIDField.value}
        errorMessage={
          form.formState.errors.amount?.message ||
          (isMaxAllowedAmountExceeded && i18next.t('sendToken.errors.insufficientBalance')) ||
          (!isAmountValid && i18next.t('sendToken.errors.amountInvalid'))
        }
        recipientApplication={recipientApplication}
        style={{ container: { marginBottom: 16 } }}
      />

      <SendTokenMessageField
        value={messageField.value}
        onChange={(value) => form.handleChange('params.data', value, messageField.onChange)}
        errorMessage={isMessageInvalid && i18next.t('sendToken.errors.message')}
        style={{ container: { marginBottom: 16 } }}
      />

      <SendTokenPriorityField
        value={priorityField.value}
        onChange={(value) => form.handleChange('priority', value, priorityField.onChange)}
        dynamicFeeEstimates={transaction?.data?.dynamicFeeEstimates}
      />

      <SendTokenTransactionFeesLabels
        recipientApplication={recipientApplication}
        transaction={transaction}
        isLoadingTransactionFees={form.isLoadingTransactionFees}
        isErrorTransactionFees={form.isErrorTransactionFees}
      />

      <View style={[styles.footer]}>
        <PrimaryButton
          onClick={verifyFormWithDryRun}
          disabled={disableNextStepButton || form.isLoading}
          isLoading={form.isLoading}
          title={i18next.t('sendToken.tokenSelect.nextStepButtonText')}
          noTheme
          style={{ flex: 1 }}
          testID="next-step-button"
        />
      </View>
    </View>
  );
}
