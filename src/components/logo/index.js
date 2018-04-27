import React from 'react';
import SvgUri from 'react-native-svg-uri';
import logoImage from '../../assets/images/lisk.svg';
import styles from './styles';

const Logo = () =>
  <SvgUri
    style={styles.image}
    width='128'
    height='128'
    source={logoImage}
  />;

export default Logo;
