import React from 'react';
import i18next from 'i18next';
import { useNavigation } from '@react-navigation/native';

import ResultScreen from 'components/screens/ResultScreen';
import AddApplicationSuccessSvg from 'assets/svgs/AddApplicationSuccessSvg';

export default function AddApplicationSuccess() {
  const navigation = useNavigation();

  return (
    <ResultScreen
      illustration={<AddApplicationSuccessSvg />}
      variant="success"
      title={i18next.t('application.manage.add.successTitle')}
      onContinue={() => navigation.navigate('Main')}
      buttonText={i18next.t('application.manage.continueToWalletButtonText')}
    />
  );
}
