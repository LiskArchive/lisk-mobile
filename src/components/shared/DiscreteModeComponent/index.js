import React from 'react';
import { View, Image } from 'react-native';
import { useSelector } from 'react-redux';

import { useTheme } from 'hooks/useTheme';

import getStyles from './styles';
import { BLUR_VARIANTS } from './constants';
import { getDiscreteModeDataSize } from './utils';

export default function DiscreteModeComponent({ children, blurVariant = 'incoming', data, style }) {
  const isDiscreteMode = useSelector((state) => state.settings.discrete);

  const { theme, styles } = useTheme({ styles: getStyles() });

  if (!isDiscreteMode) return children;

  const dataSize = getDiscreteModeDataSize(data);

  return (
    <View style={[styles.container, style]}>
      <Image
        style={[styles[`blur${dataSize}`]]}
        source={BLUR_VARIANTS[blurVariant][`${theme}${dataSize}`]}
      />
    </View>
  );
}
