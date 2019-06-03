import React from 'react';
import { View } from 'react-native';
import withTheme from '../../withTheme';
import { colors } from '../../../constants/styleGuide';

const HeaderBackground = ({ theme }) => (
  <View style={{
    flex: 1, backgroundColor: colors[theme].headerBg,
  }}>
  </View>
);

export default withTheme(HeaderBackground, {});
