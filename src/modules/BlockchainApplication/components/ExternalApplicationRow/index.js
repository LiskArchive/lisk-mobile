import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { useModal } from 'hooks/useModal';
import { P } from 'components/shared/toolBox/typography';
import Swipeable from 'components/shared/Swipeable';
import CaretSvg from 'assets/svgs/CaretSvg';
import CircleCrossedSvg from 'assets/svgs/CircleCrossedSvg';
import { colors } from 'constants/styleGuide';
import DisconnectExternalApplicationModal from '../DisconnectExternalApplicationModal/DisconnectExternalApplicationModal';

import getExternalApplicationRowStyles from './styles';

export default function ExternalApplicationRow({ application }) {
  const navigation = useNavigation();
  const { styles } = useTheme({ styles: getExternalApplicationRowStyles() });
  const disconnectApplicationModal = useModal();

  const rightActions = [
    {
      title: i18next.t('application.explore.externalApplicationList.disconnectText'),
      color: colors.light.furyRed,
      icon: () => <CircleCrossedSvg color={colors.light.white} height={22} width={22} />,
      onPress: () =>
        disconnectApplicationModal.open(() => (
          <DisconnectExternalApplicationModal
            application={application}
            onSuccess={disconnectApplicationModal.close}
            onCancel={disconnectApplicationModal.close}
          />
        )),
    },
  ];

  const handleGoToDetailsPress = () =>
    navigation.navigate('ExternalApplicationDetails', {
      application,
    });

  return (
    <>
      <Swipeable key={application.topic} rightActions={rightActions}>
        <TouchableOpacity
          style={[styles.applicationContainer, styles.theme.applicationContainer]}
          onPress={handleGoToDetailsPress}
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

              <P style={[styles.applicationUrlLabel, styles.theme.applicationUrlLabel]}>
                {application.peer.metadata.url}
              </P>
            </View>
          </View>

          <CaretSvg height={18} width={18} color={colors.light.blueGray} />
        </TouchableOpacity>
      </Swipeable>
    </>
  );
}
