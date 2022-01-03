import React from 'react';
import {
  Image, Animated, View, ImageBackground, TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Avatar from '../../../../shared/avatar';
import { fromRawLsk } from '../../../../../utilities/conversions';
import FormattedNumber from '../../../../shared/formattedNumber';
import { P, H3, H2 } from '../../../../shared/toolBox/typography';
import withTheme from '../../../../shared/withTheme';
import getStyles from './styles';
import blurBig from '../../../../../assets/images/balanceBlur/darkBig.png';
import blurMedium from '../../../../../assets/images/balanceBlur/darkMedium.png';
import blurSmall from '../../../../../assets/images/balanceBlur/darkSmall.png';
import LiskBackgroundLight from '../../../../../assets/images/homeBg-light.png';
import LiskBackgroundDark from '../../../../../assets/images/homeBg-dark.png';
import CopyToClipboard from '../../../../shared/copyToClipboard';
import { stringShortener } from '../../../../../utilities/helpers';
import { colors, themes } from '../../../../../constants/styleGuide';
import { IconButton } from '../../../../shared/toolBox/button';
import Icon from '../../../../shared/toolBox/icon';

const blurs = {
  blurBig,
  blurMedium,
  blurSmall
};

const getBalanceSize = (normalizedBalance) => {
  if (normalizedBalance.length > 6) {
    return 'Big';
  }
  if (normalizedBalance.length > 2) {
    return 'Medium';
  }
  return 'Small';
};

const Profile = ({
  styles,
  interpolate,
  account,
  token,
  t,
  height,
  address,
  lockedBalance,
  theme,
  settings,
  settingsUpdated,
  incognito,
  navigation
}) => {
  const AView = Animated.View;
  const language = useSelector((state) => state.settings.language);

  const normalizedBalance = fromRawLsk(account.balance);
  const balanceSize = getBalanceSize(normalizedBalance);
  const normalizedLockedBalance = fromRawLsk(lockedBalance);
  const lockedSize = getBalanceSize(normalizedLockedBalance);

  const toggleIncognito = () => {
    ReactNativeHapticFeedback.trigger('selection');
    settingsUpdated({
      incognito: !incognito
    });
  };

  return (
    <View testID="accountSummary" style={styles.flex}>
      <View style={[styles.flex, styles.profileContainer]}>
        <ImageBackground
          source={theme === themes.dark ? LiskBackgroundDark : LiskBackgroundLight}
          style={[styles.imgContainer]}
          imageStyle={{ opacity: theme === themes.dark ? 0.3 : 1 }}
        >
          <AView
            style={[
              styles.row,
              {
                opacity: interpolate([0, height - 120, height - 85], [1, 1, 0])
              }
            ]}
          >
            <AView>
              <View style={styles.row}>
                <H2 style={styles.title}>{t('Lisk Wallet')}</H2>
                <IconButton
                  title=""
                  icon={incognito ? 'disable-incognito' : 'enable-incognito'}
                  color={colors.light.white}
                  iconSize={20}
                  onClick={toggleIncognito}
                />
              </View>
              <View style={styles.copyContainer}>
                <CopyToClipboard
                  value={address}
                  type={P}
                  label={stringShortener(address, 6, 5)}
                  labelStyle={styles.label}
                  iconColor={colors.dark.white}
                  iconStyle={styles.iconStyle}
                  style={{ justifyContent: 'flex-start' }}
                />
              </View>
            </AView>
            <AView style={[styles.avatarContainer]}>
              <Avatar address={account.address} size={50} />
            </AView>
          </AView>
          <AView
            style={[
              {
                opacity: interpolate([0, 30], [1, 0])
              }
            ]}
          >
            <View style={[styles.row, styles.keyValueRow]}>
              <P style={styles.label}>{t('Available')}</P>
              <AView
                style={[
                  styles.balance,
                  {
                    opacity: interpolate([0, height - 120, height - 85], [1, 1, 0]),
                    top: interpolate([0, height - 50], [0, height - 120])
                  }
                ]}
              >
                <FormattedNumber
                  tokenType={token}
                  style={[
                    styles.theme.homeBalance,
                    settings.incognito ? styles.invisibleTitle : null
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
                    settings.incognito ? styles.visibleBlur : null
                  ]}
                />
              </AView>
            </View>
            <View style={[styles.row, styles.keyValueRow]}>
              <P style={styles.label}>{t('Locked')}</P>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => navigation.navigate('LockedBalance')}
              disabled={Number(normalizedLockedBalance) <= 0}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AView
                  style={[
                    styles.balance,
                    {
                      opacity: interpolate([0, height - 120, height - 85], [1, 1, 0]),
                      top: interpolate([0, height - 50], [0, height - 120])
                    }
                  ]}
                >
                  <FormattedNumber
                    tokenType={token}
                    style={[
                      styles.theme.homeBalance,
                      styles.lockedBalance,
                      settings.incognito ? styles.invisibleTitle : null
                    ]}
                    type={P}
                    language={language}
                  >
                    {normalizedLockedBalance}
                  </FormattedNumber>
                  <Image
                    source={blurs[`blur${lockedSize}`]}
                    style={[
                      styles.blur,
                      styles[`blur${lockedSize}`],
                      settings.incognito ? styles.visibleBlur : null
                    ]}
                  />
                </AView>
                {Number(normalizedLockedBalance) > 0 ? <View
                  style={styles.icon}
                  onPress={() => navigation.navigate('LockedBalance')}
                >
                  <Icon name="forward" color={colors.light.white} size={28} />
                  </View> : null}
              </View>
            </TouchableOpacity>
              </View>
          </AView>
        </ImageBackground>
      </View>
    </View>
  );
};

export default withTheme(Profile, getStyles());
