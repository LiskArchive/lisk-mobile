import React from 'react';
import {
  Image, Animated, View, ImageBackground, TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';
import Avatar from 'components/shared/avatar';
import { fromRawLsk } from 'utilities/conversions';
import FormattedNumber from 'components/shared/formattedNumber';
import { P, H3, H2 } from 'components/shared/toolBox/typography';
import withTheme from 'components/shared/withTheme';
import blurBig from 'assets/images/balanceBlur/darkBig.png';
import blurMedium from 'assets/images/balanceBlur/darkMedium.png';
import blurSmall from 'assets/images/balanceBlur/darkSmall.png';
import LiskBackgroundLight from 'assets/images/homeBg-light.png';
import LiskBackgroundDark from 'assets/images/homeBg-dark.png';
import CopyToClipboard from 'components/shared/copyToClipboard';
import { stringShortener } from 'utilities/helpers';
import { colors, themes } from 'constants/styleGuide';
import Icon from 'components/shared/toolBox/icon';
import MultiSignatureSvg from 'assets/svgs/MultiSignatureSvg';
import getStyles from './AccountSummary/styles';
import DiscreteSwitch from './DiscreteSwitch';

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

const ProfileScreen = ({
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
  isMultiSignature,
  navigation
}) => {
  const AView = Animated.View;
  const language = useSelector((state) => state.settings.language);

  const normalizedBalance = fromRawLsk(account.balance);
  const balanceSize = getBalanceSize(normalizedBalance);
  const normalizedLockedBalance = fromRawLsk(lockedBalance);
  const lockedSize = getBalanceSize(normalizedLockedBalance);

  return (
    <View testID="accountSummary" style={styles.flex}>
      <View style={[styles.flex, styles.profileContainer]}>
        <ImageBackground
          source={theme === themes.dark ? LiskBackgroundDark : LiskBackgroundLight}
          style={[styles.imgContainer]}
          imageStyle={{ opacity: theme === themes.dark ? 0.3 : 1 }}
        >
          <AView style={[{
            opacity: interpolate([0, height - 200], [1, 0]),
          }, styles.accountTitle]} >
            <View style={styles.row}>
              <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('SwitchAccount')} >
                <H2 style={styles.title}>{t('Accounts')}</H2>
                <View style={styles.icon} onPress={() => navigation.navigate('SwitchAccount')}>
                  <Icon name="forward" color={colors.light.white} size={22} />
                </View>
              </TouchableOpacity>
              <View style={styles.row} >
                <DiscreteSwitch />
                {isMultiSignature && (
                  <TouchableOpacity
                    style={[styles.avatar]}
                    onPress={() => navigation.navigate('Multisignature')}
                  >
                    <MultiSignatureSvg size={1} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </AView>
          <AView
            style={[
              styles.row,
              {
                opacity: interpolate([0, height - 200], [1, 0])
              }
            ]}
          >
            <AView>
              <View style={styles.row}>
                <H2 style={styles.title}>{t('Lisk Wallet')}</H2>
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
              <Avatar address={account.address} size={40} />
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
                    settings.discrete ? styles.invisibleTitle : null
                  ]}
                  type={H3}
                  language={language}
                  testID="token-balance"
                >
                  {normalizedBalance}
                </FormattedNumber>
                <Image
                  source={blurs[`blur${balanceSize}`]}
                  testID="amount-blur"
                  style={[
                    styles.blur,
                    styles[`blur${balanceSize}`],
                    settings.discrete ? styles.visibleBlur : null
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
                        settings.discrete ? styles.invisibleTitle : null
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
                        settings.discrete ? styles.visibleBlur : null
                      ]}
                    />
                  </AView>
                  {Number(normalizedLockedBalance) > 0 ? (
                    <View style={styles.icon} onPress={() => navigation.navigate('LockedBalance')}>
                      <Icon name="forward" color={colors.light.white} size={28} />
                    </View>
                  ) : null}
                </View>
              </TouchableOpacity>
            </View>
          </AView>
        </ImageBackground>
      </View>
    </View>
  );
};

export default withTheme(ProfileScreen, getStyles());
