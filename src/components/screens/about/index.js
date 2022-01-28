import React from 'react';
import { View, Image, Linking } from 'react-native';
import { translate } from 'react-i18next';
import { H4, P, A } from '../../shared/toolBox/typography';
import Logo from '../../../assets/images/lisk-logo.png';
import packageJson from '../../../../package.json';
import withTheme from '../../shared/withTheme';
import getStyles from './styles';
import URLs from '../../../constants/URLs';

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
