import React from 'react';
import i18next from 'i18next';
import { useNavigation } from '@react-navigation/native';

import ResultScreen from 'components/screens/ResultScreen';
import AddApplicationSuccessSvg from 'assets/svgs/AddApplicationSuccessSvg';

export default function AddApplicationSuccessScreen() {
  const navigation = useNavigation();

  return (
    <ResultScreen
      onContinue={() => navigation.navigate('Main')}
      illustration={<AddApplicationSuccessSvg />}
      variant="success"
      title={i18next.t('application.manage.add.successTitle')}
      description={i18next.t('application.manage.add.successDescription')}
      buttonText={i18next.t('application.manage.continueToWalletButtonText')}
    />
  );
}
