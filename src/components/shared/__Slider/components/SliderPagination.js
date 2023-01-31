import { Animated, View, Dimensions } from 'react-native';
import React from 'react';

import { useTheme } from 'contexts/ThemeContext';
import { colors } from 'constants/styleGuide';

import getSliderPaginationStyles from './SliderPagination.styles';

const { width } = Dimensions.get('window');

export default function SliderPagination({ data, scrollX }) {
  const { styles } = useTheme({ styles: getSliderPaginationStyles() });

  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 30, 12],
          extrapolate: 'clamp',
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: [
            colors.light.platinumGray,
            colors.light.ultramarineBlue,
            colors.light.platinumGray,
          ],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={idx.toString()}
            style={[styles.dot, { width: dotWidth, backgroundColor }]}
          />
        );
      })}
    </View>
  );
}
