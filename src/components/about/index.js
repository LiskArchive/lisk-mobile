import React from 'react';
import { View, Image, Linking } from 'react-native';
import { H1, H4, P, A } from '../toolBox/typography';
import Logo from '../../assets/images/lisk-logo.png';
import packageJson from '../../../package.json';
import withTheme from '../withTheme';
import getStyles from './styles';

const logoSize = 83;

const openLiskWebsite = () => {
  Linking.openURL('https://lisk.io/products')
    // eslint-disable-next-line no-console
    .catch(err => console.error('An error occurred', err));
};

const About = ({ styles }) => (
  <View style={[styles.container, styles.theme.container]}>
    <View style={styles.innerContainer}>
        <View>
          <H1 style={styles.theme.header}>About Lisk</H1>
          <View style={styles.centerAligned}>
            <View style={styles.logo}>
              <Image source={Logo} style={styles.logoImage} width={logoSize} height={logoSize} />
            </View>
            <H4 style={[styles.appTitle, styles.theme.appTitle]}>Lisk</H4>
            <P style={[styles.version, styles.theme.version]}>{`Version ${packageJson.version}`}</P>
            <A onPress={openLiskWebsite} style={[styles.link, styles.theme.link]}>
              Read more in Lisk&reg; website
            </A>
          </View>
        </View>
        <View style={styles.footer}>
          <P style={[styles.copy, styles.theme.copy]}>
            Copyright &copy; {(new Date()).getFullYear()} Lisk Stiftung
          </P>
        </View>
    </View>
  </View>
);

export default withTheme(About, getStyles({ logoSize }));
