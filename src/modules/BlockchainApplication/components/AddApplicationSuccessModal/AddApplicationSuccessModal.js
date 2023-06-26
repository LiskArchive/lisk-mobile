import React from 'react';
import i18next from 'i18next';

import ResultScreen from 'components/screens/ResultScreen';
import { useModal } from 'hooks/useModal';
import AddApplicationSuccessSvg from 'assets/svgs/AddApplicationSuccessSvg';

export default function AddApplicationSuccessModal({ navigation }) {
  const modal = useModal();

  const handleContinuePress = () => {
    modal.toggle(false);

    navigation.navigate('Main');
  };

  return (
    <ResultScreen
      onContinue={handleContinuePress}
      illustration={<AddApplicationSuccessSvg />}
      variant="success"
      title={i18next.t('application.manage.add.successTitle')}
      description={i18next.t('application.manage.add.successDescription')}
      continueButtonTitle={i18next.t('application.manage.continueToWalletButtonText')}
      styles={{
        footer: {
          padding: 0,
          marginTop: 24,
        },
      }}
    />
  );
}
