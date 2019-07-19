import React from 'react';
import { View } from 'react-native';
import withTheme from '../../../withTheme';
import getStyles from './styles';

const HeaderBackground = ({ styles, noBorder }) => {
  const borderType = noBorder ? 'nonBordered' : 'bordered';
  return (
    <View
      style={[
        styles.wrapper,
        styles.theme[borderType],
      ]}
    />
  );
};

export default withTheme(HeaderBackground, getStyles());
