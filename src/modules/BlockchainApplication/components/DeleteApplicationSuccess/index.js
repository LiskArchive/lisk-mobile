import React from 'react';
import { translate } from 'react-i18next';

import colors from 'constants/styleGuide/colors';
import CircleCheckedSvg from 'assets/svgs/CircleCheckedSvg';
import SuccessScreen from 'modules/Auth/components/success';

function DeleteApplicationSuccess({ t, finalCallback, sharedData: { application } }) {
  return (
    <SuccessScreen
      illustration={<CircleCheckedSvg height={90} width={90} color={colors.light.ufoGreen} />}
      title={'Application has now been removed'}
      description={`You can always add ${application.chainName} again to your application list.`}
      onContinue={finalCallback}
      buttonText={t('application.manage.continueToWalletButtonText')}
    />
  );
}

export default translate()(DeleteApplicationSuccess);
