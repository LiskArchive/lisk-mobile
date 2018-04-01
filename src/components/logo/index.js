import React, { Component } from 'react';
import SvgUri from 'react-native-svg-uri';
import { Image } from 'react-native';
import logoImage from '../../assets/images/lisk.svg';
import styles from './styles';

const Logo = (props) =>
  <SvgUri
    style={styles.image}
    width='128'
    height='128'
    source={logoImage}
  />

export default Logo;
