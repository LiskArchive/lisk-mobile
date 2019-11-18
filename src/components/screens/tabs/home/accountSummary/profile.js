import React from 'react';
import { Image, Animated, View } from 'react-native';
import connect from 'redux-connect-decorator';
import Avatar from '../../../../shared/avatar';
import { fromRawLsk } from '../../../../../utilities/conversions';
import FormattedNumber from '../../../../shared/formattedNumber';
import { P, H3 } from '../../../../shared/toolBox/typography';
import withTheme from '../../../../shared/withTheme';
import getStyles from './styles';
import Icon from '../../../../shared/toolBox/icon';
import { tokenMap } from '../../../../../constants/tokens';
import blurBig from '../../../../../assets/images/balanceBlur/darkBig.png';
import blurMedium from '../../../../../assets/images/balanceBlur/darkMedium.png';
import blurSmall from '../../../../../assets/images/balanceBlur/darkSmall.png';
import { colors, themes } from '../../../../../constants/styleGuide';

const blurs = {
  blurBig,
  blurMedium,
  blurSmall,
};

@connect(state => ({
  language: state.settings.language,
}))
class Profile extends React.Component {
  render() {
    const {
      styles,
      priceTicker,
      interpolate,
      height,
      account,
      settings,
      token,
      theme,
      language,
    } = this.props;
    const AView = Animated.View;
    let balanceSize = 'Small';

    const normalizedBalance = fromRawLsk(account.balance);
    if (normalizedBalance.length > 6) balanceSize = 'Big';
    else if (normalizedBalance.length > 2) balanceSize = 'Medium';

    let fiatBalance = 0;
    const ratio = priceTicker[token][settings.currency];
    if (normalizedBalance && ratio) {
      fiatBalance = (normalizedBalance * ratio).toLocaleString(
        `${language}-${language.toUpperCase()}`,
        { maximumFractionDigits: 2 }
      );
    }

    return (
      <View testID="accountSummary">
        <AView
          style={[
            styles.avatarContainer,
            { marginTop: interpolate([0, 100], [0, 100]) },
          ]}
        >
          {token === 'LSK' ? (
            <Avatar address={account.address} size={50} />
          ) : (
            <View style={styles.tokenLogoWrapper}>
              <Icon
                style={styles.tokenLogo}
                name={tokenMap[token].icon}
                size={30}
                color={
                  theme === themes.light
                    ? colors.light.BTC
                    : colors.dark.homeHeaderBg
                }
              />
            </View>
          )}
        </AView>

        <AView
          style={[
            styles.balance,
            {
              opacity: interpolate([0, height - 120, height - 85], [1, 1, 0]),
              top: interpolate([0, height - 50], [0, height - 120]),
            },
          ]}
        >
          <FormattedNumber
            tokenType={token}
            style={[
              styles.theme.homeBalance,
              settings.incognito ? styles.invisibleTitle : null,
            ]}
            type={H3}
            language={language}
          >
            {normalizedBalance}
          </FormattedNumber>
          <Image
            source={blurs[`blur${balanceSize}`]}
            style={[
              styles.blur,
              styles[`blur${balanceSize}`],
              settings.incognito ? styles.visibleBlur : null,
            ]}
          />
        </AView>
        <AView
          style={[
            styles.fiat,
            {
              opacity: interpolate([0, 30], [1, 0]),
              top: interpolate([0, 100], [0, 80]),
            },
          ]}
        >
          {!(settings.incognito || Number.isNaN(fiatBalance)) ? (
            <P style={[styles.fiatValue, styles.theme.fiatValue]}>
              {`~ ${fiatBalance} ${settings.currency}`}
            </P>
          ) : null}
        </AView>
      </View>
    );
  }
}

export default withTheme(Profile, getStyles());
