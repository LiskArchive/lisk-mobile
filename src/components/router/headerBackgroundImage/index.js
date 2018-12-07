import React from 'react';
import { Image, View } from 'react-native';
import bg from '../../../assets/images/bg.png';
import withTheme from '../../withTheme';
import getStyles from './styles';

const HeaderBackgroundImage = ({ styles }) => (
  <View style={[styles.wrapper, styles.theme.wrapper]}>
    {
      <Image
        style={[styles.image, styles.theme.image]}
        source={bg}
      />
    }
  </View>
);

export default withTheme(HeaderBackgroundImage, getStyles());

