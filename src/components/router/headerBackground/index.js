import React from 'react';
import { View } from 'react-native';
import withTheme from '../../withTheme';
import { colors } from '../../../constants/styleGuide';

const HeaderBackground = ({ theme, bgColor }) => (
  <View style={{
    flex: 1, backgroundColor: bgColor ? bgColor[theme] : colors[theme].headerBg,
  }}>
  </View>
);

export default withTheme(HeaderBackground, {});
