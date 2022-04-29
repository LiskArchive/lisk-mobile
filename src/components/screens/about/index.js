import React from 'react';
import { View, Image, Linking } from 'react-native';
import { translate } from 'react-i18next';
import URLs from 'constants/URLs';
import { H4, P, A } from 'components/shared/toolBox/typography';
import withTheme from 'components/shared/withTheme';
import Logo from 'assets/images/lisk-logo.png';
import packageJson from '../../../../package.json';
import getStyles from './styles';

const logoSize = 83;

const openLiskWebsite = () => {
  Linking.openURL(URLs.liskHomepage)
    // eslint-disable-next-line no-console
    .catch(err => console.error('An error occurred', err));
};

const About = ({ styles, t }) => (
  <View style={[styles.container, styles.theme.container]}>
    <View style={styles.logo}>
      <Image
        source={Logo}
        style={styles.logoImage}
        width={logoSize}
        height={logoSize}
      />
    </View>

    <H4 style={[styles.appTitle, styles.theme.appTitle]}>Lisk</H4>

    <P style={[styles.version, styles.theme.version]}>
      {`Version ${packageJson.version}`}
    </P>

    <A onPress={openLiskWebsite} style={[styles.link, styles.theme.link]}>
      {t('Read more on the Lisk website')}
    </A>
  </View>
);

export default withTheme(translate()(About), getStyles({ logoSize }));
