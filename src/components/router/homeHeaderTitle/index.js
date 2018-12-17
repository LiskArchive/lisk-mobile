import React from 'react';
import { Animated, Text, View, Image } from 'react-native';
import { fromRawLsk } from '../../../utilities/conversions';
import Avatar from '../../avatar';
import withTheme from '../../withTheme';
import getStyles from './styles';
import darkBig from '../../../assets/images/balanceBlur/darkBig.png';
import darkMedium from '../../../assets/images/balanceBlur/darkMedium.png';
import darkSmall from '../../../assets/images/balanceBlur/darkSmall.png';
import lightBig from '../../../assets/images/balanceBlur/lightBig.png';
import lightMedium from '../../../assets/images/balanceBlur/lightMedium.png';
import lightSmall from '../../../assets/images/balanceBlur/lightSmall.png';

const blurs = {
  darkBig, darkMedium, darkSmall, lightBig, lightMedium, lightSmall,
};

const homeHeaderTitle = ({
  styles, theme, style, children,
}) => {
  if (typeof children === 'string') {
    return (
      <Text style={[styles.main, styles.theme.main, style]}>
        {children}
      </Text>
    );
  }

  const {
    interpolate, address, balance, placeHolder, type, incognito,
  } = children;

  let balanceSize = 'Small';
  if (balance.length > 6) balanceSize = 'Big';
  else if (balance.length > 2) balanceSize = 'Medium';

  return (
    <View style={styles.container}>
      <Animated.Text
        numberOfLines={1}
        style={[
          styles.main,
          styles.theme[`${type}Main`],
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
        {incognito ?
          <Image
            source={blurs[`${theme}${balanceSize}`]}
            style={styles[`blur${balanceSize}`]}
          /> :
          <Text style={[styles.main, styles.theme[`${type}Main`], style]}>
            {`${fromRawLsk(balance)} LSK`}
          </Text>
        }
      </Animated.View>
    </View>
  );
};

export default withTheme(homeHeaderTitle, getStyles());
