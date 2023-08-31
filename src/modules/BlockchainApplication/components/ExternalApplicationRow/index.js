import { View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { useModal } from 'hooks/useModal';
import { P, B } from 'components/shared/toolBox/typography';
import Swipeable from 'components/shared/Swipeable';
import ResultScreen from 'components/screens/ResultScreen';
import CaretSvg from 'assets/svgs/CaretSvg';
import CircleCrossedSvg from 'assets/svgs/CircleCrossedSvg';
import InfoSvg from 'assets/svgs/InfoSvg';
import { colors } from 'constants/styleGuide';
import ExternalApplicationDetails from '../ExternalApplicationDetails';
import DisconnectExternalApplication from '../DisconnectExternalApplication';

import getExternalApplicationRowStyles from './styles';

export default function ExternalApplicationRow({ application }) {
  const [activeAction, setActiveAction] = useState();
  const modal = useModal();

  const { styles } = useTheme({ styles: getExternalApplicationRowStyles() });

  useEffect(() => {
    if (!modal.isOpen) {
      setActiveAction(undefined);
    }
  }, [modal.isOpen]);

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
                You can always add <B>{application.peer.metadata.name}</B> again to your application
                list.
              </P>
            }
            onContinue={() => setActiveAction(undefined)}
            continueButtonTitle="Back to connections"
          />
        );

      case 'disconnectError':
        return (
          <ResultScreen
            variant="error"
            title="Error disconnecting application"
            description={
              <P style={[styles.resultDescription, styles.theme.resultDescription]}>
                There was an error trying to disconnect <B>{application.peer.metadata.name}</B>.
                Please try again.
              </P>
            }
            onContinue={() => setActiveAction('disconnect')}
            continueButtonTitle="Try again"
          />
        );

      default:
        return null;
    }
  }

  useEffect(() => {
    if (activeAction) {
      modal.open(renderActiveAction());
    } else {
      modal.close();
    }
  }, [activeAction]);

  return (
    <>
      <Swipeable key={application.topic} rightActions={rightActions}>
        <TouchableOpacity
          style={[styles.applicationContainer]}
          onPress={() => setActiveAction('details')}
        >
          <View style={[styles.applicationNameContainer]}>
            <Image
              source={{ uri: application.peer.metadata.icons[0] }}
              style={[styles.applicationLogoImage]}
            />

            <View>
              <P style={[styles.applicationNameLabel, styles.theme.applicationNameLabel]}>
                {application.peer.metadata.name}
              </P>
            </View>
          </View>

          <CaretSvg height={18} width={18} color={colors.light.blueGray} />
        </TouchableOpacity>
      </Swipeable>
    </>
  );
}
