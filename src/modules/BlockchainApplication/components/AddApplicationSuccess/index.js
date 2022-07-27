import React from 'react';
import { translate } from 'react-i18next';
import AddApplicationSuccessSvg from 'assets/svgs/AddApplicationSuccessSvg';
import SuccessScreen from 'modules/Auth/components/success';

const AddApplicationSuccess = ({ t, navigation }) => {
  return (
    <SuccessScreen
      illustration={<AddApplicationSuccessSvg />}
      title={t('application.manage.successTitle')}
      onContinue={() => navigation.navigate('Main')}
      buttonText={t('application.manage.buttons.continue')}
    />
  );
};

export default translate()(AddApplicationSuccess);
