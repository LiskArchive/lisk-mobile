import React from 'react';
import { View, Text } from 'react-native';
import { translate } from 'react-i18next';

import { PrimaryButton } from 'components/shared/toolBox/button';
import { useTheme } from 'hooks/useTheme';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import { useBlockchainApplicationExplorer } from '../../../BlockchainApplication/hooks/useBlockchainApplicationExplorer';

import getSendTokenSelectApplicationsStepStyles from './styles';
import { SendTokenRecipientAccountField, SendTokenRecipientApplicationField, SendTokenSenderApplicationField } from './components';

function SendTokenSelectApplicationsStep({
  nextStep,
  form,
  t
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
          <Text>{t('sendToken.applicationsSelect.loadingApplicationsText')}</Text>
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
          t={t}
        />

        <SendTokenRecipientApplicationField
          form={form}
          applications={applications}
          t={t}
        />

        <SendTokenRecipientAccountField
          form={form}
          accounts={accounts}
          t={t}
        />
      </View>

      <PrimaryButton
        noTheme
        style={styles.button}
        onClick={nextStep}
        title={t('sendToken.applicationsSelect.nextStepButtonText')}
      />
    </View>
  );
}

export default translate()(SendTokenSelectApplicationsStep);
