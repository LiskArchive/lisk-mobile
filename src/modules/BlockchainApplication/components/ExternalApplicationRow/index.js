import { View, Image } from 'react-native';
import React, { useState } from 'react';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import { P, B } from 'components/shared/toolBox/typography';
import Swipeable from 'components/shared/Swipeable';
import BottomModal from 'components/shared/BottomModal';
import ResultScreen from 'components/screens/ResultScreen';
import CheckSvg from 'assets/svgs/CheckSvg';
import CircleCrossedSvg from 'assets/svgs/CircleCrossedSvg';
import InfoSvg from 'assets/svgs/InfoSvg';
import { colors } from 'constants/styleGuide';
import ExternalApplicationDetails from '../ExternalApplicationDetails';
import DisconnectExternalApplication from '../DisconnectExternalApplication';

import getExternalBlockchainApplicationRowStyles from './styles';

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
        return (
          <ResultScreen
            variant="success"
            title="Application has now been disconnected"
            description={
              <P style={[styles.resultDescription, styles.theme.resultDescription]}>
                You can always add <B>{application.peerMetadata.name}</B> again to your application
                list.
              </P>
            }
            onContinue={() => setActiveAction(undefined)}
            buttonText="Back to connections"
          />
        );

      case 'disconnectError':
        return (
          <ResultScreen
            variant="error"
            title="Error disconnecting application"
            description={
              <P style={[styles.resultDescription, styles.theme.resultDescription]}>
                There was an error trying to disconnect <B>{application.peerMetadata.name}</B>.
                Please try again.
              </P>
            }
            onContinue={() => setActiveAction('disconnect')}
            buttonText="Try again"
          />
        );

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
