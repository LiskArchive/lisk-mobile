import React from 'react';
import i18next from 'i18next';

import { colors } from 'constants/styleGuide';
import PinSvg from 'assets/svgs/PinSvg';
import DeleteSvg from 'assets/svgs/DeleteSvg';

import { usePinBlockchainApplication } from '../../hooks/usePinBlockchainApplication';

export function useBlockchainApplicationRowActions({
  application,
  variant,
  setShowDeleteDefaultApplicationModal,
  deleteApplication,
}) {
  const { togglePin } = usePinBlockchainApplication();

  let leftActions;
  let rightActions;

  switch (variant) {
    case 'explore':
      leftActions = [
        {
          title: !application.isPinned
            ? i18next.t('application.explore.applicationList.pinText')
            : i18next.t('application.explore.applicationList.unpinText'),
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
          title: i18next.t('application.explore.applicationList.deleteText'),
          color: colors.light.furyRed,
          icon: () => <DeleteSvg color={colors.light.white} />,
          onPress: () => {
            if (application.isDefault) {
              setShowDeleteDefaultApplicationModal(true);
            } else {
              deleteApplication(application);
            }
          },
        },
      ];

      break;

    default:
      break;
  }

  return { leftActions, rightActions };
}
