import React from 'react';
import { Image, Animated } from 'react-native';
import Avatar from '../avatar';
import { fromRawLsk } from '../../utilities/conversions';
import FormattedNumber from '../formattedNumber';
import Share from '../share';
import { P, H2 } from '../toolBox/typography';
import withTheme from '../withTheme';
import getStyles from './styles';
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
  opacity,
  top,
}) => {
  const AView = Animated.View;
  let balanceSize = 'Small';
  const normalizedBalance = fromRawLsk(account.balance);
  if (normalizedBalance.length > 6) balanceSize = 'Big';
  else if (normalizedBalance.length > 2) balanceSize = 'Medium';

  let faitBalance = 0;
  if (normalizedBalance && priceTicker[settings.currency]) {
    faitBalance = (normalizedBalance * priceTicker[settings.currency]).toFixed(2);
  }

  return (
    <AView style={[styles.container, { opacity, top, height },
      { marginTop: interpolate([0, height + 10], [0, -1 * (height - 1)]) }]}>
      <AView style={[styles.avatar, { opacity },
        { marginTop: interpolate([0, 100], [0, 100]) }]}>
        <Avatar address={account.address} size={60} />
      </AView>
      <AView style={[styles.address, { opacity },
        {
          opacity: interpolate([0, 30], [1, 0]),
          top: interpolate([0, 100], [0, 80]),
        },
      ]}>
        <Share type={P}
          style={[styles.addressP, styles.theme.homeAddress]}
          iconColor={theme === 'dark' ? colors[theme].gray2 : colors[theme].gray5}
          containerStyle={styles.addressContainer}
          value={account.address} icon={true} />
      </AView>
      <AView style={[styles.balance, { opacity },
        {
          opacity: interpolate([0, height - 120, height - 85], [1, 1, 0]),
          top: interpolate([0, height - 50], [0, height - 120]),
        },
      ]}>
        <FormattedNumber
          tokenType={settings.token.active}
          style={[styles.theme.homeBalance, settings.incognito ? styles.invisibleTitle : null]}
          type={H2}>{fromRawLsk(account.balance)}</FormattedNumber>
        <Image source={blurs[`${settings.theme}${balanceSize}`]}
          style={[styles.blur, styles[`blur${balanceSize}`],
          settings.incognito ? styles.visibleBlur : null]} />
      </AView>
      <AView style={[styles.fiat, { opacity },
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
    </AView>
  );
};

export default withTheme(Profile, getStyles());
