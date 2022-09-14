import React from 'react';
import { Animated, Text, Image, View, TouchableWithoutFeedback } from 'react-native';
import { useSelector } from 'react-redux';
import { fromRawLsk } from 'utilities/conversions';
import Avatar from 'components/shared/avatar';
import Icon from 'components/shared/toolBox/icon';
import withTheme from 'components/shared/withTheme';
import { tokenMap } from 'constants/tokens';
import { colors } from 'constants/styleGuide';
import { deviceType } from 'utilities/device';
import darkBig from 'assets/images/balanceBlur/darkBig.png';
import darkMedium from 'assets/images/balanceBlur/darkMedium.png';
import darkSmall from 'assets/images/balanceBlur/darkSmall.png';
import lightBig from 'assets/images/balanceBlur/lightBig.png';
import lightMedium from 'assets/images/balanceBlur/lightMedium.png';
import lightSmall from 'assets/images/balanceBlur/lightSmall.png';
import getStyles from './styles';

const blurs = {
  darkBig,
  darkMedium,
  darkSmall,
  lightBig,
  lightMedium,
  lightSmall,
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
  balance,
  theme,
  styles,
  address,
  discrete,
  type,
  token,
  scrollY,
  wallet,
}) => {
  let balanceSize = 'Small';
  if (balance > 6) balanceSize = 'Big';
  else if (balance > 2) balanceSize = 'Medium';

  return (
    <Animated.View
      style={[
        styles.extendedWrapper,
        styles[`${type}Extended`],
        {
          opacity: interpolate(scrollY, [0, 90, 130], [0, 0, 1]),
          transform: [{ translateY: interpolate(scrollY, [0, 100, 210], [100, 100, 0]) }],
        },
      ]}
    >
      {token === 'LSK' ? (
        <Avatar address={address} size={30} style={styles.avatar} />
      ) : (
        <View style={[styles.tokenLogoWrapper, wallet ? styles.walletTokenLogoWrapper : null]}>
          <Icon
            style={styles.tokenLogo}
            name={tokenMap[token].icon}
            size={18}
            color={wallet ? colors.light.white : colors.light.BTC}
          />
        </View>
      )}
      {discrete ? (
        <Image source={blurs[`${theme}${balanceSize}`]} style={styles[`blur${balanceSize}`]} />
      ) : (
        <Text style={[styles.title, styles.theme[`${type}Main`]]}>{`${balance} ${token}`}</Text>
      )}
    </Animated.View>
  );
};

const SimpleHeader = ({ styles, type, title, scrollY }) => (
  <Animated.Text
    numberOfLines={1}
    style={[
      styles[`${deviceType()}${type}Simple`],
      styles.title,
      styles.theme[`${type}Main`],
      { opacity: interpolate(scrollY, [0, 100, 130], [1, 1, 0]) },
    ]}
    accessibilityTraits="header"
    allowFontScaling={false}
  >
    {title}
  </Animated.Text>
);

const localizedBalance = (balance) => {
  const language = 'en';

  return Number(balance).toLocaleString(`${language}-${language.toUpperCase()}`, {
    maximumFractionDigits: 20,
  });
};

const HomeHeaderTitle = ({ styles, type, scrollY, address, balance, placeHolder, scrollToTop }) => {
  const {
    token: { active },
    theme,
    discrete,
  } = useSelector((state) => state.settings);
  const { info } = useSelector((state) => state.accounts);
  const wallet = false;
  const os = deviceType();

  const data = {
    type,
    placeHolder: type === 'wallet' ? placeHolder : `${tokenMap[active].label} wallet`,
    scrollY: scrollY || new Animated.Value(0),
    theme,
    discrete,
    token: active,
    address: type === 'wallet' ? address : info[active]?.address ?? '',
    balance: type === 'wallet' ? balance : info[active]?.balance ?? 0,
  };

  return (
    <View style={[styles.container, styles[`${os}${type}Container`]]}>
      <TouchableWithoutFeedback onPress={() => scrollToTop()}>
        <View>
          <SimpleHeader
            styles={styles}
            type={data.type}
            title={data.placeHolder}
            scrollY={data.scrollY}
          />
          <ExtendedTitle
            balance={data.balance ? localizedBalance(fromRawLsk(data.balance)) : '0'}
            theme={theme}
            token={data.token}
            styles={styles}
            scrollY={data.scrollY}
            address={data.address}
            discrete={data.discrete}
            type={data.type}
            wallet={wallet}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default withTheme(HomeHeaderTitle, getStyles());
