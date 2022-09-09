import React from 'react'
import i18next from 'react-i18next'

import colors from 'constants/styleGuide/colors'
import CircleCheckedSvg from 'assets/svgs/CircleCheckedSvg'
import SuccessScreen from 'modules/Auth/components/success'

export default function DeleteApplicationSuccess({ finalCallback, sharedData: { application } }) {
  return (
    <SuccessScreen
      illustration={<CircleCheckedSvg height={90} width={90} color={colors.light.ufoGreen} />}
      title={i18next.t('application.manage.delete.success.title')}
      description={i18next.t('application.manage.delete.success.description', {
        applicationName: application.chainName,
      })}
      onContinue={finalCallback}
      buttonText={i18next.t('application.manage.continueToWalletButtonText')}
    />
  )
}
