import React from 'react';
import { Image } from 'react-native';
import bg from '../../assets/images/bg.png';
import styles from './styles';

const BackgroundImage = () =>
  <Image
    style={styles.image}
    source={bg}
  />;

export default BackgroundImage;

