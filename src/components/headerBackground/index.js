import React from 'react';
import { Image, View } from 'react-native';
import Src from '../../assets/images/stripes.png';
import withTheme from '../withTheme';
import getStyles from './styles';

const Bg = ({ styles }) => (<View>
  <Image
    style={styles.main}
    source={Src}
  />
</View>);

export default withTheme(Bg, getStyles());
