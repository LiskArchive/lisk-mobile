import React from 'react';
import i18next from 'i18next';

import ResultScreen from 'components/screens/ResultScreen';
import { useTheme } from 'contexts/ThemeContext';

import getStyles from './styles';

export default function DeleteApplicationSuccess({ finalCallback, sharedData: { application } }) {
  const { styles } = useTheme({ styles: getStyles() });

  return (
    <ResultScreen
      variant="success"
      title={i18next.t('application.manage.delete.success.title')}
      description={i18next.t('application.manage.delete.success.description', {
        applicationName: application.chainName,
      })}
      onContinue={finalCallback}
      continueButtonTitle={i18next.t('application.manage.continueToWalletButtonText')}
      styles={{ footer: styles.footer }}
    />
  );
}
