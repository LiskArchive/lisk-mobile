import React from 'react';
import { View, Image } from 'react-native';
import { H1, H4, P } from '../toolBox/typography';
import styles from './styles';
import Logo from '../../assets/images/lisk-logo.png';
import packageJson from '../../../package.json';

const logoSize = 83;

const Settings = () => (
  <View style={styles.container}>
    <View style={styles.innerContainer}>
        <View>
          <H1>About Lisk</H1>
          <View style={styles.centerAligned}>
            <View style={styles.logo}>
              <Image source={Logo} style={styles.logoImage} width={logoSize} height={logoSize} />
            </View>
            <H4 style={styles.appTitle}>Lisk</H4>
            <P style={styles.version}>{`Version ${packageJson.version} (${packageJson.version})`}</P>
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

export default Settings;
