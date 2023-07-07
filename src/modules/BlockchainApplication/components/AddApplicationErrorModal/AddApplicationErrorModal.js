import React from 'react';
import i18next from 'i18next';

import { useModal } from 'hooks/useModal';
import ResultScreen from 'components/screens/ResultScreen';
import AddApplicationErrorSvg from 'assets/svgs/AddApplicationErrorSvg';

export default function AddApplicationErrorModal({ navigation, chainName }) {
  const modal = useModal();

  const handleContinuePress = () => {
    modal.toggle(false);

    navigation.navigate('AddApplication');
  };

  const description = chainName
    ? i18next.t('application.manage.add.errorDescription', { chainName })
    : i18next.t('application.manage.add.errorGenericDescription');

  return (
    <ResultScreen
      onContinue={handleContinuePress}
      illustration={<AddApplicationErrorSvg />}
      variant={'error'}
      title={i18next.t('application.manage.add.errorTitle')}
      description={description}
      continueButtonTitle={i18next.t('application.manage.add.errorOnContinueButtonText')}
      styles={{
        footer: {
          padding: 0,
          marginTop: 24,
        },
      }}
    />
  );
}
