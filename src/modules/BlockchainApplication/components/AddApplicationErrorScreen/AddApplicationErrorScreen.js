import React from 'react';
import i18next from 'i18next';
import { useNavigation, useRoute } from '@react-navigation/native';

import ResultScreen from 'components/screens/ResultScreen';

export default function AddApplicationErrorScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const chainName = route.params?.chainName;

  const description = chainName
    ? i18next.t('application.manage.add.errorDescription', { chainName })
    : i18next.t('application.manage.add.errorGenericDescription');

  return (
    <ResultScreen
      onContinue={() => navigation.navigate('AddApplication')}
      variant={'error'}
      title={i18next.t('application.manage.add.errorTitle')}
      description={description}
      buttonText={i18next.t('application.manage.add.errorOnContinueButtonText')}
    />
  );
}
