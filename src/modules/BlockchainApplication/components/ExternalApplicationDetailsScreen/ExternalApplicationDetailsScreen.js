import React from 'react';
import { SafeAreaView, Image, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useTheme } from 'contexts/ThemeContext';
import { useModal } from 'hooks/useModal';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { P, H3 } from 'components/shared/toolBox/typography';
import FormattedDate from 'components/shared/formattedDate';
import { Button } from 'components/shared/toolBox/button';
import { stringShortener } from 'utilities/helpers';
import DisconnectExternalApplicationModal from '../DisconnectExternalApplicationModal/DisconnectExternalApplicationModal';

import getExternalBlockchainApplicationDetailsStyles from './ExternalApplicationDetailsScreen.styles';

export default function ExternalApplicationDetailsScreen() {
  const navigation = useNavigation();

  const route = useRoute();

  const disconnectApplicationModal = useModal();

  const { application } = route.params;

  const { styles } = useTheme({ styles: getExternalBlockchainApplicationDetailsStyles() });

  const handleDisconnectPress = () =>
    disconnectApplicationModal.open(() => (
      <DisconnectExternalApplicationModal
        application={application}
        onSuccess={disconnectApplicationModal.close}
        onCancel={disconnectApplicationModal.close}
      />
    ));

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <HeaderBackButton onPress={navigation.goBack} />

      <View style={[styles.header]}>
        <Image source={{ uri: application.peer.metadata.icons[0] }} style={[styles.logo]} />

        <H3 style={[styles.title, styles.theme.title]}>{application.peer.metadata.name}</H3>
      </View>

      <View style={[styles.body]}>
        <View style={[styles.fieldContainer]}>
          <P style={[styles.label, styles.theme.label]}>Connection ID</P>

          <P style={[styles.value, styles.theme.value]}>{stringShortener(application.topic, 24)}</P>
        </View>

        <View style={[styles.fieldContainerLast]}>
          <P style={[styles.label, styles.theme.label]}>Expiry date</P>

          <FormattedDate style={[styles.value, styles.theme.value]}>
            {application.expiry * 1000}
          </FormattedDate>
        </View>
      </View>

      <Button onPress={handleDisconnectPress} style={{ marginBottom: 16 }}>
        Disconnect
      </Button>
    </SafeAreaView>
  );
}
