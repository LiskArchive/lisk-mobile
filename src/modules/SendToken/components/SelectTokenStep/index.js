/* eslint-disable max-statements */
import React from 'react';
import { View } from 'react-native';
import { useController } from 'react-hook-form';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import { useBlockchainApplicationExplorer } from 'modules/BlockchainApplication/hooks/useBlockchainApplicationExplorer';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';
import { useSendTokenAmountChecker } from '../../hooks/useSendTokenAmountChecker';

import getSendTokenSelectTokenStepStyles from './styles';
import {
  SendTokenMessageField,
  SendTokenPriorityField,
  SendTokenTransactionFeesLabels,
  SendTokenAmountField,
  TokenSelectField,
} from './components';

export default function SendTokenSelectTokenStep({ nextStep, prevStep, form, transaction }) {
  const { applicationsMetadata } = useBlockchainApplicationExplorer();

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

  const { field: recipientAccountAddressField } = useController({
    name: 'recipientAccountAddress',
    control: form.control,
  });

  const { field: senderApplicationChainIDField } = useController({
    name: 'senderApplicationChainID',
    control: form.control,
  });

  const { field: recipientApplicationChainIDField } = useController({
    name: 'recipientApplicationChainID',
    control: form.control,
  });

  const { styles } = useTheme({
    styles: getSendTokenSelectTokenStepStyles(),
  });

  const recipientApplication = applicationsMetadata?.data.find(
    (application) => application.chainID === recipientApplicationChainIDField.value
  );

  const senderApplication = applicationsMetadata?.data.find(
    (application) => application.chainID === senderApplicationChainIDField.value
  );

  const { isMaxAllowedAmountExceeded } = useSendTokenAmountChecker({
    recipientApplication,
    selectedTokenID: tokenIDField.value,
    amount: amountField.value,
    transactionFee: transaction.data.transaction.fee,
  });

  const disableNextStepButton =
    !form.watch('tokenID') || !form.watch('amount') || isMaxAllowedAmountExceeded;

  return (
    <View style={[styles.wrapper, styles.theme.wrapper]}>
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
        />

        <SendTokenTransactionFeesLabels
          tokenID={tokenIDField.value}
          recipientAccountAddress={recipientAccountAddressField.value}
          senderApplication={senderApplication}
          recipientApplication={recipientApplication}
          transaction={transaction}
        />
      </View>

      <View style={[styles.row]}>
        <Button
          style={[styles.prevStepButton, styles.theme.prevStepButton]}
          onClick={prevStep}
          title={i18next.t('sendToken.tokenSelect.prevStepButtonText')}
        />

        <PrimaryButton
          onClick={nextStep}
          disabled={disableNextStepButton}
          title={i18next.t('sendToken.tokenSelect.nextStepButtonText')}
          noTheme
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
}
