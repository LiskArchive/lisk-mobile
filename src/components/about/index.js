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

const Settings = ({ styles }) => (
  <View style={styles.container}>
    <View style={styles.innerContainer}>
        <View>
          <H1>About Lisk</H1>
          <View style={styles.centerAligned}>
            <View style={styles.logo}>
              <Image source={Logo} style={styles.logoImage} width={logoSize} height={logoSize} />
            </View>
            <H4 style={styles.appTitle}>Lisk</H4>
            <P style={styles.version}>{`Version ${packageJson.version}`}</P>
            <A onPress={openLiskWebsite} style={styles.link}>
              Read more in Lisk&reg; website
            </A>
          </View>
        </View>
        <View style={styles.footer}>
          <P style={styles.copy}>Copyright &copy; </P>
          <P style={styles.copy}>{(new Date()).getFullYear()}</P>
          <P style={styles.copy}> Lisk Stiftung</P>
        </View>
    </View>
  </View>
);

export default withTheme(Settings, getStyles({ logoSize }));
