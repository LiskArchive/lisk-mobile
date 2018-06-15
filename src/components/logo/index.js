import React from 'react';
import { View } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import logoImage from '../../assets/images/lisk.svg';
import styles from './styles';

const Logo = () =>
  <View style={styles.image}>
    <SvgUri
      width='128'
      height='128'
      source={logoImage}
    />
  </View>;

export default Logo;
