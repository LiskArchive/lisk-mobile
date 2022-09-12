import React from 'react';
import { Animated } from 'react-native';
import { P } from 'components/shared/toolBox/typography';
import { SCREEN_HEIGHTS, deviceHeight } from 'utilities/device';
import styles from './styles';

const Title = ({ children, opacity = 1 }) => {
  if (deviceHeight() <= SCREEN_HEIGHTS.SM) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <P style={styles.text}>{children}</P>
    </Animated.View>
  );
};

export default Title;
