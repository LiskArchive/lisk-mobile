import React from 'react';
import { Image, View } from 'react-native';

import { useTheme } from 'contexts/ThemeContext';
import { P, H3 } from 'components/shared/toolBox/typography';
import FormattedDate from 'components/shared/formattedDate';
import { Button } from 'components/shared/toolBox/button';
import { stringShortener } from 'utilities/helpers';

import getExternalBlockchainApplicationDetailsStyles from './styles';

export default function ExternalApplicationDetails({ application, onApplicationDisconnect }) {
  const { styles } = useTheme({ styles: getExternalBlockchainApplicationDetailsStyles() });

  return (
    <View style={[styles.container, styles.theme.container]}>
      <View style={[styles.header]}>
        <Image source={{ uri: application.peerMetadata.icons[0] }} style={[styles.logo]} />

        <H3 style={[styles.title, styles.theme.title]}>{application.peerMetadata.name}</H3>
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

      <Button style={{ marginBottom: 16 }} onClick={onApplicationDisconnect}>
        Disconnect
      </Button>
    </View>
  );
}
