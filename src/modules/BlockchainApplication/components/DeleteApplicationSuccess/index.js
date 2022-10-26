import React from 'react';
import i18next from 'i18next';

import ResultScreen from 'components/screens/ResultScreen';

export default function DeleteApplicationSuccess({ finalCallback, sharedData: { application } }) {
  return (
    <ResultScreen
      variant="success"
      title={i18next.t('application.manage.delete.success.title')}
      description={i18next.t('application.manage.delete.success.description', {
        applicationName: application.chainName,
      })}
      onContinue={finalCallback}
      buttonText={i18next.t('application.manage.continueToWalletButtonText')}
    />
  );
}
