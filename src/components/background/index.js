import React from 'react';
import { Image } from 'react-native';
import bg from '../../assets/images/bg.png';
import withTheme from '../shared/withTheme';
import getStyles from './styles';

const BackgroundImage = ({ styles }) =>
  <Image
    style={styles.image}
    source={bg}
  />;

export default withTheme(BackgroundImage, getStyles());
