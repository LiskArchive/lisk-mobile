import React from 'react';
import { View } from 'react-native';
import withTheme from '../../withTheme';
import { colors, themes } from '../../../constants/styleGuide';
import { setColorOpacity } from '../../../utilities/helpers';
import getStyles from './styles';

const HeaderBackground = ({ theme, styles }) => (
  <View
    style={[
      styles,
      {
        backgroundColor: colors[theme].headerBg,
        borderBottomColor: theme === themes.light
          ? colors.light.whiteSmoke
          : setColorOpacity(colors.light.white, 0.24),
      },
    ]}
  />
);

export default withTheme(HeaderBackground, getStyles());
