import React from 'react';
import { View } from 'react-native';
import withTheme from '../../withTheme';
import { colors, themes } from '../../../constants/styleGuide';
import { setColorOpacity } from '../../../utilities/helpers';

const HeaderBackground = ({ theme }) => (
  <View
    style={{
      flex: 1,
      backgroundColor: colors[theme].headerBg,
      borderBottomWidth: 1,
      borderBottomColor: theme === themes.light
        ? colors.light.whiteSmoke
        : setColorOpacity(colors.light.white, 0.24),
    }}
  />
);

export default withTheme(HeaderBackground, {});
