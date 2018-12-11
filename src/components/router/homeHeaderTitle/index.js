import React from 'react';
import { Animated, Text, View } from 'react-native';
import Avatar from '../../avatar';
import withTheme from '../../withTheme';
import getStyles from './styles';

const homeHeaderTitle = ({ styles, style, children }) => {
  if (typeof children === 'string') {
    return (
      <Text style={[styles.main, styles.theme.main, style]}>
        {children}
      </Text>
    );
  }

  const {
    interpolate, address, balance, placeHolder,
  } = children;

  return (
    <View style={styles.container}>
      <Animated.Text
        numberOfLines={1}
        style={[
          styles.main,
          styles.theme.main,
          style,
          { opacity: interpolate([0, 100, 130], [1, 1, 0]) },
        ]}
        accessibilityTraits="header"
        allowFontScaling={false}>
        {placeHolder}
      </Animated.Text>
      <Animated.View style={[
        styles.wrapper,
        {
          opacity: interpolate([0, 90, 130], [0, 0, 1]),
          transform: [{ translateY: interpolate([0, 100, 210], [100, 100, 0]) }],
        },
      ]}>
        <Avatar address={address} size={30} style={styles.avatar} />
        <Text style={[styles.main, styles.theme.main, style]}>{`${balance} LSK`}</Text>
      </Animated.View>
    </View>
  );
};

export default withTheme(homeHeaderTitle, getStyles());
