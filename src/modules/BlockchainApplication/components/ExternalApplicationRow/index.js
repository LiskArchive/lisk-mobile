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
import ExternalApplicationDetails from '../ExternalApplicationDetails';
import DisconnectExternalApplication from '../DisconnectExternalApplication';

export default function ExternalApplicationRow({ application }) {
  const [activeAction, setActiveAction] = useState();

  const { styles } = useTheme({ styles: getExternalBlockchainApplicationRowStyles() });

  const rightActions = [
    {
      title: i18next.t('application.explore.externalApplicationList.detailsText'),
      color: colors.light.blueGray,
      icon: () => <InfoSvg color={colors.light.white} height={20} width={20} />,
      onPress: () => setActiveAction('details'),
    },
    {
      title: i18next.t('application.explore.externalApplicationList.disconnectText'),
      color: colors.light.furyRed,
      icon: () => <CircleCrossedSvg color={colors.light.white} height={22} width={22} />,
      onPress: () => setActiveAction('disconnect'),
    },
  ];

  function renderActiveAction() {
    switch (activeAction) {
      case 'details':
        return (
          <ExternalApplicationDetails
            application={application}
            onApplicationDisconnect={() => setActiveAction('disconnect')}
          />
        );

      case 'disconnect':
        return (
          <DisconnectExternalApplication
            application={application}
            onSuccess={() => setActiveAction('disconnectSuccess')}
            onError={() => setActiveAction('disconnectError')}
            onCancel={() => setActiveAction(undefined)}
          />
        );

      case 'disconnectSuccess':
        return <Text>Success!</Text>;

      case 'disconnectError':
        return <Text>Error!</Text>;

      default:
        return null;
    }
  }

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

      <BottomModal show={!!activeAction} toggleShow={() => setActiveAction(undefined)}>
        {renderActiveAction()}
      </BottomModal>
    </>
  );
}
