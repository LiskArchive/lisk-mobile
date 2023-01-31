import React from 'react';
import { View, Animated, Easing } from 'react-native';

import { useTheme } from 'contexts/ThemeContext';
import { H2, P } from 'components/shared/toolBox/typography';

import getSliderSlideStyles from './SliderSlide.styles';

export default function SliderSlide({ item }) {
  const { styles } = useTheme({ styles: getSliderSlideStyles() });

  const translateYBody = new Animated.Value(10);

  const bodyStyle = [
    styles.body,
    {
      transform: [
        {
          translateY: translateYBody,
        },
      ],
    },
  ];

  Animated.timing(translateYBody, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <H2 style={[styles.title, styles.theme.title]}>{item.title}</H2>

        <P style={[styles.description, styles.theme.description]}>{item.description}</P>
      </View>

      <Animated.View style={bodyStyle}>{item.body}</Animated.View>
    </View>
  );
}
