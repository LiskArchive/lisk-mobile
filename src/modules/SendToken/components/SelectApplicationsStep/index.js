import React from 'react';
import { View, Text } from 'react-native';

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

  const { styles } = useTheme({
    styles: getSendTokenSelectApplicationsStepStyles(),
  });

  if (applications.isLoading) {
    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <View style={[styles.container]}>
          <Text>Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.wrapper, styles.theme.wrapper]}>
      <View style={[styles.container]}>
        <SendTokenSenderApplicationField
          form={form}
          applications={applications}
        />

        <SendTokenRecipientApplicationField
          form={form}
          applications={applications}
        />

        <SendTokenRecipientAccountField
          form={form}
          accounts={accounts}
        />
      </View>

      <PrimaryButton
        noTheme
        style={styles.button}
        onClick={nextStep}
        title={'Continue'}
      />
    </View>
  );
}
