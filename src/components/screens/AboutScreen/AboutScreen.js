import React from 'react';
import { View, Linking } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { H4, P, A } from 'components/shared/toolBox/typography';
import DropDownHolder from 'utilities/alert';
import URLs from 'constants/URLs';
import LiskIsotypeSvg from 'assets/svgs/LiskIsotypeSvg';
import packageJson from '../../../../package.json';

import getStyles from './AboutScreen.styles';

export default function AboutScreen() {
  const { styles } = useTheme({
    styles: getStyles(),
  });

  const handleOpenLiskWebsite = () =>
    Linking.openURL(URLs.liskHomepage).catch(() =>
      DropDownHolder.error('Error', 'Error opening link. Please try again later.')
    );

  return (
    <View style={[styles.container, styles.theme.container]} testID="about-screen">
      <View style={styles.isotypeContainer}>
        <LiskIsotypeSvg height={48} width={48} />
      </View>

      <H4 style={[styles.appTitle, styles.theme.appTitle]}>Lisk</H4>

      <P style={[styles.version, styles.theme.version]}>
        {i18next.t('settings.about.versionDescription', { version: packageJson.version })}
      </P>

      <A onPress={handleOpenLiskWebsite} style={[styles.link, styles.theme.link]}>
        {i18next.t('settings.about.openWebsiteButtonTitle')}
      </A>
    </View>
  );
}
