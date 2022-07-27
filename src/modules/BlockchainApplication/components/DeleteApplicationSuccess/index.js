import React from 'react';
import { translate } from 'react-i18next';

import colors from 'constants/styleGuide/colors';
import CircleCheckedSvg from 'assets/svgs/CircleCheckedSvg';
import SuccessScreen from 'modules/Auth/components/success';

function DeleteApplicationSuccess({ t, navigation, route }) {
  const { application } = route.params;

  return (
    <SuccessScreen
      illustration={<CircleCheckedSvg height={90} width={90} color={colors.light.ufoGreen} />}
      title={'Application has now been removed'}
      description={`You can always add ${application.name} again to your application list.`}
      onContinue={() => navigation.navigate('Main')}
      buttonText={t('application.manage.buttons.continue')}
    />
  );
}

export default translate()(DeleteApplicationSuccess);
