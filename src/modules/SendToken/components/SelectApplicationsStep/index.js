/* eslint-disable max-statements */
import React from 'react';
import { View, Text } from 'react-native';
import { useController } from 'react-hook-form';
import i18next from 'i18next';

import { PrimaryButton } from 'components/shared/toolBox/button';
import { useTheme } from 'hooks/useTheme';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import { useBlockchainApplicationExplorer } from '../../../BlockchainApplication/hooks/useBlockchainApplicationExplorer';

import getSendTokenSelectApplicationsStepStyles from './styles';
import { SendTokenRecipientAccountField, SendTokenRecipientApplicationField, SendTokenSenderApplicationField } from './components';

export default function SendTokenSelectApplicationsStep({
  nextStep,
  form
}) {
  const { applications } = useBlockchainApplicationExplorer();

  const { accounts } = useAccounts();

  const { field: senderApplicationChainIDField } = useController({
    name: 'senderApplicationChainID',
    control: form.control,
  });

  const { field: recipientApplicationChainIDField } = useController({
    name: 'recipientApplicationChainID',
    control: form.control,
  });

  const { field: addressField } = useController({
    name: 'recipientAccountAddress',
    control: form.control,
  });

  const { field: addressFormatField } = useController({
    name: 'recipientAccountAddressFormat',
    control: form.control,
  });

  const { styles } = useTheme({
    styles: getSendTokenSelectApplicationsStepStyles(),
  });

  if (applications.isLoading) {
    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <View style={[styles.container]}>
          <Text>
            {i18next.t('sendToken.applicationsSelect.loadingApplicationsText')}
          </Text>
        </View>
      </View>
    );
  }

  const disableNextStepButton = !form.watch('senderApplicationChainID')
   || !form.watch('recipientApplicationChainID')
   || !form.watch('recipientAccountAddress');

  return (
    <View style={[styles.wrapper, styles.theme.wrapper]}>
      <View style={[styles.container]}>
        <SendTokenSenderApplicationField
          value={senderApplicationChainIDField.value}
          onChange={senderApplicationChainIDField.onChange}
          errorMessage={form.formState.errors.senderApplicationChainID?.message}
          applications={applications}
        />

        <SendTokenRecipientApplicationField
          value={recipientApplicationChainIDField.value}
          onChange={recipientApplicationChainIDField.onChange}
          errorMessage={form.formState.errors.recipientApplicationChainID?.message}
          applications={applications}
        />

        <SendTokenRecipientAccountField
          value={addressField.value}
          onChange={addressField.onChange}
          errorMessage={form.formState.errors.recipientAccountAddress?.message}
          addressFormat={addressFormatField.value}
          onAddressFormatChange={addressFormatField.onChange}
          accounts={accounts}
        />
      </View>

      <PrimaryButton
        onClick={nextStep}
        disabled={disableNextStepButton}
        title={i18next.t('sendToken.applicationsSelect.nextStepButtonText')}
        noTheme
        style={styles.button}
      />
    </View>
  );
}
