import { View, Image, Text } from 'react-native';
import React, { useState } from 'react';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import { P } from 'components/shared/toolBox/typography';
import { colors } from 'constants/styleGuide';
import Swipeable from 'components/shared/Swipeable';
import CheckSvg from 'assets/svgs/CheckSvg';
import BottomModal from 'components/shared/BottomModal';
import CircleCrossedSvg from 'assets/svgs/CircleCrossedSvg';
import InfoSvg from 'assets/svgs/InfoSvg';

import getExternalBlockchainApplicationRowStyles from './styles';

export default function ExternalApplicationRow({ application }) {
  const [showApplicationInfoModal, setShowApplicationInfoModal] = useState(false);
  const [showDisconnectApplicationModal, setShowDisconnectApplicationModal] = useState(false);

  const { styles } = useTheme({ styles: getExternalBlockchainApplicationRowStyles() });

  const rightActions = [
    {
      title: i18next.t('application.explore.externalApplicationList.detailsText'),
      color: colors.light.blueGray,
      icon: () => <InfoSvg color={colors.light.white} />,
      onPress: () => setShowApplicationInfoModal(true),
    },
    {
      title: i18next.t('application.explore.externalApplicationList.disconnectText'),
      color: colors.light.furyRed,
      icon: () => <CircleCrossedSvg color={colors.light.white} />,
      onPress: () => setShowDisconnectApplicationModal(true),
    },
  ];

  return (
    <>
      <Swipeable key={application.topic} rightActions={rightActions}>
        <View style={[styles.applicationContainer]}>
          <View style={[styles.applicationNameContainer]}>
            <Image
              source={{ uri: application.peerMetadata.icons[0] }}
              style={[styles.applicationLogoImage]}
            />

            <View>
              <P style={[styles.applicationNameLabel, styles.theme.applicationNameLabel]}>
                {application.peerMetadata.name}
              </P>
            </View>
          </View>

          <CheckSvg
            height={16}
            width={16}
            color={application.active ? colors.light.ufoGreen : colors.light.blueGray}
          />
        </View>
      </Swipeable>

      <BottomModal
        show={showApplicationInfoModal}
        toggleShow={() => setShowApplicationInfoModal(false)}
      >
        {/* TODO: Implement external application Info component. */}
        <Text>Info</Text>
      </BottomModal>

      <BottomModal
        show={showDisconnectApplicationModal}
        toggleShow={() => setShowDisconnectApplicationModal(false)}
      >
        {/* TODO: Implement external application Disconnect component. */}
        <Text>Disconnect</Text>
      </BottomModal>
    </>
  );
}
