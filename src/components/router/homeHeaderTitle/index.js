import React from 'react';
import { Animated, Text, View, Image } from 'react-native';
import { fromRawLsk } from '../../../utilities/conversions';
import Avatar from '../../avatar';
import Icon from '../../toolBox/icon';
import withTheme from '../../withTheme';
import getStyles from './styles';
import darkBig from '../../../assets/images/balanceBlur/darkBig.png';
import darkMedium from '../../../assets/images/balanceBlur/darkMedium.png';
import darkSmall from '../../../assets/images/balanceBlur/darkSmall.png';
import lightBig from '../../../assets/images/balanceBlur/lightBig.png';
import lightMedium from '../../../assets/images/balanceBlur/lightMedium.png';
import lightSmall from '../../../assets/images/balanceBlur/lightSmall.png';
import { tokenMap } from '../../../constants/tokens';
import { colors } from '../../../constants/styleGuide';

const blurs = {
  darkBig, darkMedium, darkSmall, lightBig, lightMedium, lightSmall,
};

const interpolate = (scrollY, inputRange, outputRange) => {
  if (scrollY && typeof scrollY.interpolate === 'function') {
    return scrollY.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp',
    });
  }
  return 1;
};

const ExtendedTitle = ({
  balance, theme, styles, address, incognito, type, token, scrollY,
}) => {
  let balanceSize = 'Small';
  if (balance > 6) balanceSize = 'Big';
  else if (balance > 2) balanceSize = 'Medium';

  return (
    <Animated.View style={[
      styles.wrapper,
      {
        opacity: interpolate(scrollY, [0, 90, 130], [0, 0, 1]),
        transform: [{ translateY: interpolate(scrollY, [0, 100, 210], [100, 100, 0]) }],
      },
    ]}>
      {
        token === 'LSK' ?
          <Avatar address={address} size={30} style={styles.avatar} /> :
          <View style={[styles.tokenLogoWrapper, styles.theme.tokenLogoWrapper]}>
            <Icon
              style={styles.tokenLogo}
              name={tokenMap[token].icon}
              size={18}
              color={colors.light.BTC}
            />
          </View>
      }
      {incognito ?
        <Image
          source={blurs[`${theme}${balanceSize}`]}
          style={styles[`blur${balanceSize}`]}
        /> :
        <Text style={[styles.main, styles.theme[`${type}Main`]]}>
          {`${balance} ${token}`}
        </Text>
      }
    </Animated.View>
  );
};

const SimpleHeader = ({
  styles, type, title, scrollY,
}) => (
  <Animated.Text
    numberOfLines={1}
    style={[
      styles.main,
      styles.theme[`${type}Main`],
      { opacity: interpolate(scrollY, [0, 100, 130], [1, 1, 0]) },
    ]}
    accessibilityTraits='header'
    allowFontScaling={false}>
    {title}
  </Animated.Text>
);

const HomeHeaderTitle = ({
  styles, theme, children: data,
}) => (
  <View style={styles.container}>
    <SimpleHeader
      styles={styles}
      type={typeof data === 'string' ? 'home' : data.type}
      title={typeof data === 'string' ? data : data.placeHolder}
      scrollY={data.scrollY}
      />
    {
      typeof data !== 'string' ?
      <ExtendedTitle
        balance={data.balance !== undefined ? fromRawLsk(data.balance) : '0'}
        theme={theme}
        token={data.token}
        styles={styles}
        scrollY={data.scrollY}
        address={data.address}
        incognito={data.incognito}
        type={data.type}
        /> : null
    }
  </View>
);

export default withTheme(HomeHeaderTitle, getStyles());
