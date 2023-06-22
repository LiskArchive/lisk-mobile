/* eslint-disable max-statements */
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { useTheme } from 'contexts/ThemeContext';
import { themes, colors } from 'constants/styleGuide';

import { getSkeletonStyles } from './Skeleton.styles';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

/**
 * Skeleton component to act as a placeholder preview for content before the data gets loaded
 * @param {string} variant - The variant of the skeleton, can be "rectangle" or "circle"
 * @param {number} width - Width of the skeleton in pixels
 * @param {number} height - Height of the skeleton in pixels
 * @param {object} style - Style object to add custom styles to the component
 */
export default function Skeleton({ variant = 'rectangle', width = 100, height = 10, style }) {
  const { theme, styles } = useTheme({ styles: getSkeletonStyles({ width, height, variant }) });

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear.inOut,
        useNativeDriver: true,
      })
    ).start();
  }, [animatedValue]);

  let containerStyle;

  if (variant === 'circle') {
    containerStyle = styles.circleContainer;
  } else {
    containerStyle = styles.rectangleContainer;
  }

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  const primaryBgColor =
    theme === themes.light ? colors.light.platinumGray : colors.dark.satinDeepBlack;
  const secondaryBgColor = theme === themes.light ? colors.light.mystic : colors.dark.volcanicSand;

  return (
    <View style={[styles.container, styles.theme.container, containerStyle, style?.container]}>
      <AnimatedLinearGradient
        colors={[primaryBgColor, secondaryBgColor, secondaryBgColor, primaryBgColor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.animation,
          style?.animation,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
}
