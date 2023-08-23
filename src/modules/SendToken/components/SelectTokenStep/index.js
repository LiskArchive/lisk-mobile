/* eslint-disable max-statements */
import React from 'react';
import { View } from 'react-native';
import { useController } from 'react-hook-form';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { useApplicationsExplorer } from 'modules/BlockchainApplication/hooks/useApplicationsExplorer';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { useSendTokenAmountChecker } from '../../hooks/useSendTokenAmountChecker';

import getSendTokenSelectTokenStepStyles from './styles';
import {
  SendTokenMessageField,
  SendTokenPriorityField,
  SendTokenTransactionFeesLabels,
  SendTokenAmountField,
  TokenSelectField,
} from './components';

export default function SendTokenSelectTokenStep({ nextStep, isValidAddress, form, transaction }) {
  const applications = useApplicationsExplorer();

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

  const { isMaxAllowedAmountExceeded } = useSendTokenAmountChecker({
    recipientApplication,
    selectedTokenID: tokenIDField.value,
    amount: amountField.value,
    transactionFee: transaction?.data?.transaction?.fee,
  });

  const disableNextStepButton =
    !form.watch('tokenID') ||
    !form.watch('senderApplicationChainID') ||
    !form.watch('recipientApplicationChainID') ||
    !isValidAddress ||
    isMaxAllowedAmountExceeded ||
    form.isLoadingTransactionFees ||
    form.isErrorTransactionFees;

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
          (isMaxAllowedAmountExceeded && i18next.t('sendToken.errors.insufficientBalance'))
        }
        recipientApplication={recipientApplication}
        style={{ container: { marginBottom: 16 } }}
      />

      <SendTokenMessageField
        value={messageField.value}
        onChange={(value) => form.handleChange('params.data', value, messageField.onChange)}
        style={{ container: { marginBottom: 16 } }}
      />

      <SendTokenPriorityField
        value={priorityField.value}
        onChange={(value) => form.handleChange('priority', value, priorityField.onChange)}
        dynamicFeeEstimates={transaction?.data?.dynamicFeeEstimates}
      />

      {tokenIDField.value && (
        <SendTokenTransactionFeesLabels
          tokenID={tokenIDField.value}
          recipientApplication={recipientApplication}
          transaction={transaction}
          isLoadingTransactionFees={form.isLoadingTransactionFees}
          isErrorTransactionFees={form.isErrorTransactionFees}
        />
      )}
      <View style={[styles.footer]}>
        <PrimaryButton
          onClick={nextStep}
          disabled={disableNextStepButton}
          title={i18next.t('sendToken.tokenSelect.nextStepButtonText')}
          noTheme
          style={{ flex: 1 }}
          testID="next-step-button"
        />
      </View>
    </View>
  );
}
