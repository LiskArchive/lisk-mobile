import React from 'react';

import { colors } from 'constants/styleGuide';
import PinSvg from 'assets/svgs/PinSvg';
import DeleteSvg from 'assets/svgs/DeleteSvg';

import { usePinBlockchainApplication } from '../../hooks/usePinBlockchainApplication';

export function useBlockchainApplicationRowActions({
  t, application, variant, navigation
}) {
  const { togglePin } = usePinBlockchainApplication();

  let leftActions;
  let rightActions;

  switch (variant) {
    case 'explore':
      leftActions = [
        {
          title: !application.isPinned
            ? t('application.explore.applicationList.pinText')
            : t('application.explore.applicationList.unpinText'),
          color: colors.light.ufoGreen,
          icon: () => (
            <PinSvg
              color={colors.light.white}
              variant={!application.isPinned ? 'outline' : 'closed'}
            />
          ),
          onPress: () => togglePin(application.chainID),
        },
      ];
      break;

    case 'manage':
      rightActions = [
        {
          title: t('application.explore.applicationList.deleteText'),
          color: colors.light.furyRed,
          icon: () => <DeleteSvg color={colors.light.white} />,
          onPress: () => {
            navigation.navigate('DeleteApplication', { application });
          },
        },
      ];
      break;

    default:
      break;
  }

  return { leftActions, rightActions };
}
