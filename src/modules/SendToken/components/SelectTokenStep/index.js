/* eslint-disable max-statements */
import React from 'react';
import { View } from 'react-native';
import { useController } from 'react-hook-form';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';

import getSendTokenSelectTokenStepStyles from './styles';
import {
  SendTokenMessageField,
  SendTokenPriorityField,
  SendTokenTransactionFeesLabels,
  SendTokenAmountField,
  TokenSelectField,
} from './components';

export default function SendTokenSelectTokenStep({ nextStep, prevStep, form }) {
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

  const disableNextStepButton = !form.watch('tokenID') || !form.watch('amount');

  return (
    <View style={[styles.wrapper, styles.theme.wrapper]}>
      <View style={[styles.container]}>
        <TokenSelectField
          value={tokenIDField.value}
          onChange={tokenIDField.onChange}
          errorMessage={form.formState.errors.tokenID?.message}
          style={{ toggle: { container: { marginBottom: 16 } } }}
        />

        <SendTokenAmountField
          value={amountField.value}
          onChange={amountField.onChange}
          tokenID={tokenIDField.value}
          errorMessage={form.formState.errors.amount?.message}
          style={{ container: { marginBottom: 16 } }}
        />

        <SendTokenMessageField
          value={messageField.value}
          onChange={messageField.onChange}
          style={{ container: { marginBottom: 16 } }}
        />

        <SendTokenPriorityField value={priorityField.value} onChange={priorityField.onChange} />

        <SendTokenTransactionFeesLabels
          tokenID={tokenIDField.value}
          amount={amountField.value}
          priority={priorityField.value}
          message={messageField.value}
          recipientAccountAddress={recipientAccountAddressField.value}
          senderApplicationChainID={senderApplicationChainIDField.value}
          recipientApplicationChainID={recipientApplicationChainIDField.value}
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
