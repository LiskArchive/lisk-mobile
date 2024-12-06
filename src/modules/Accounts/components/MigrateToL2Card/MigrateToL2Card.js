import React from 'react';
import { View, Linking } from 'react-native';
import Toast from 'react-native-toast-message';

import { useTheme } from 'contexts/ThemeContext';
import URLs from 'constants/URLs';
import { B, Small, A } from 'components/shared/toolBox/typography';
import ExternalLinkSvg from 'assets/svgs/ExternalLinkSvg';

import getStyles from './MigrateToL2Card.styles';
import InfoRoundSvg from '../../../../assets/svgs/InfoRoundSvg';

export default function MigrateToL2Card({ style }) {
  const { styles } = useTheme({ styles: getStyles() });

  const handleOpenMigrationLink = () =>
    Linking.openURL(URLs.liskMigration).catch(() =>
      Toast.show({
        type: 'error',
        text2: 'Error opening link. Please try again later.',
      })
    );

  return (
    <View style={[styles.container, styles.theme.container, style]}>
      <InfoRoundSvg size={16} style={styles.icon} />

      <View style={styles.textContainer}>
        <B>Migrate to Lisk L2</B>
        <Small style={[styles.description, styles.theme.description]}>
          Lisk has transitioned to a Layer 2 network powered by Optimism&apos;s OP Stack in 2024. To
          continue using Lisk, migrate your accounts seamlessly on the Lisk Portal.
        </Small>

        <View style={styles.linkContainer}>
          <A onPress={handleOpenMigrationLink} style={[styles.link, styles.theme.link]}>
            Lisk Portal
          </A>
          <ExternalLinkSvg size={1} />
        </View>
      </View>
    </View>
  );
}
