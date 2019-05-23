import React from 'react';
import { Image, Animated, View } from 'react-native';
import Avatar from '../avatar';
import { fromRawLsk } from '../../utilities/conversions';
import FormattedNumber from '../formattedNumber';
import Share from '../share';
import { P, H2 } from '../toolBox/typography';
import withTheme from '../withTheme';
import getStyles from './styles';
import Icon from '../toolBox/icon';
import { tokenMap, tokenKeys } from '../../constants/tokens';
import { stringShortener } from '../../utilities/helpers';
import darkBig from '../../assets/images/balanceBlur/darkBig.png';
import darkMedium from '../../assets/images/balanceBlur/darkMedium.png';
import darkSmall from '../../assets/images/balanceBlur/darkSmall.png';
import lightBig from '../../assets/images/balanceBlur/lightBig.png';
import lightMedium from '../../assets/images/balanceBlur/lightMedium.png';
import lightSmall from '../../assets/images/balanceBlur/lightSmall.png';
import { colors } from '../../constants/styleGuide';

const blurs = {
  darkBig, darkMedium, darkSmall, lightBig, lightMedium, lightSmall,
};

const Profile = ({
  styles,
  theme,
  priceTicker,
  interpolate,
  height,
  account,
  settings,
  token,
}) => {
  const AView = Animated.View;
  let balanceSize = 'Small';
  const address = (account.address && token === tokenKeys[1]) ?
    stringShortener(account.address, 10, 10) : account.address;

  const normalizedBalance = fromRawLsk(account.balance);
  if (normalizedBalance.length > 6) balanceSize = 'Big';
  else if (normalizedBalance.length > 2) balanceSize = 'Medium';

  // @todo Use the corresponding fiat exchange ratio
  let faitBalance = 0;
  if (normalizedBalance && priceTicker[token][settings.currency]) {
    faitBalance = (normalizedBalance * priceTicker[token][settings.currency]).toFixed(2);
  }

  // console.log('>> Profile', token, account.address);

  return (<View testID='accountSummary'>
      <AView style={[styles.avatar,
        { marginTop: interpolate([0, 100], [0, 100]) }]}
      >
        {
          token === 'LSK' ?
          <Avatar address={account.address} size={60} /> :
          <View style={[styles.tokenLogoWrapper, styles.theme.tokenLogoWrapper]}>
            <Icon
              style={styles.tokenLogo}
              name={tokenMap[token].icon}
              size={40}
              color={colors[theme][token]}
            />
          </View>
        }
      </AView>
      <AView style={[styles.address,
        {
          opacity: interpolate([0, 30], [1, 0]),
          top: interpolate([0, 100], [0, 80]),
        },
      ]}>
        <Share type={P}
          style={[styles.addressP, styles.theme.homeAddress]}
          iconColor={theme === 'dark' ? colors[theme].gray2 : colors[theme].gray5}
          containerStyle={styles.addressContainer}
          value={account.address}
          title={address} icon={true} />
      </AView>
      <AView style={[styles.balance,
        {
          opacity: interpolate([0, height - 120, height - 85], [1, 1, 0]),
          top: interpolate([0, height - 50], [0, height - 120]),
        },
      ]}>
        <FormattedNumber
          tokenType={token}
          style={[styles.theme.homeBalance, settings.incognito ? styles.invisibleTitle : null]}
          type={H2}>{normalizedBalance}</FormattedNumber>
        <Image source={blurs[`${settings.theme}${balanceSize}`]}
          style={[styles.blur, styles[`blur${balanceSize}`],
          settings.incognito ? styles.visibleBlur : null]} />
      </AView>
      <AView style={[styles.fiat,
        {
          opacity: interpolate([0, 30], [1, 0]),
          top: interpolate([0, 100], [0, 80]),
        },
      ]}>
      {
        !settings.incognito ?
          <P style={[styles.fiatValue, styles.theme.fiatValue]}>
            {`${faitBalance} ${settings.currency}`}
          </P> : null
      }
      </AView>
    </View>
  );
};

export default withTheme(Profile, getStyles());
