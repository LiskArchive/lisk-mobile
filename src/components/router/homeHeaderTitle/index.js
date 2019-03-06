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

const blurs = {
  darkBig, darkMedium, darkSmall, lightBig, lightMedium, lightSmall,
};

const ExtendedTitle = ({
  balance, theme, styles, interpolate = () => 1, address, incognito, type, token,
}) => {
  let balanceSize = 'Small';
  if (balance > 6) balanceSize = 'Big';
  else if (balance > 2) balanceSize = 'Medium';

  return (
    <Animated.View style={[
      styles.wrapper,
      {
        opacity: interpolate([0, 90, 130], [0, 0, 1]),
        transform: [{ translateY: interpolate([0, 100, 210], [100, 100, 0]) }],
      },
    ]}>
      {
        token === 'LSK' ?
          <Avatar address={address} size={30} style={styles.avatar} /> :
          <Icon name='language' size={40} color={'orange'} />
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
  styles, type, interpolate = () => 1, title,
}) => (
  <Animated.Text
    numberOfLines={1}
    style={[
      styles.main,
      styles.theme[`${type}Main`],
      { opacity: interpolate([0, 100, 130], [1, 1, 0]) },
    ]}
    accessibilityTraits="header"
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
      interpolate={typeof data === 'string' ? () => 1 : data.interpolate}
      />
    {
      typeof data !== 'string' ?
      <ExtendedTitle
        balance={data.balance !== undefined ? fromRawLsk(data.balance) : '0'}
        theme={theme}
        token={data.token}
        styles={styles}
        interpolate={data.interpolate}
        address={data.address}
        incognito={data.incognito}
        type={data.type}
        /> : null
    }
  </View>
);

export default withTheme(HomeHeaderTitle, getStyles());
