/* eslint-disable max-statements */
import React, { useEffect, useRef } from 'react';
import { Animated, } from 'react-native';
import { translate } from 'react-i18next';
import { useSelector } from 'react-redux';
import easing from 'utilities/easing';
import withTheme from 'components/shared/withTheme';
import { useAccountInfo } from '../../hooks/useAccounts/useAccountInfo';
import Profile from '../Profile';
import getStyles from './styles';

const AccountSummaryScreen = ({ t, scrollY, navigation }) => {
  const settings = useSelector(state => state.settings);
  const { summary: account } = useAccountInfo();
  const priceTicker = useSelector(state => state.service.priceTicker);

  const opacity = useRef(new Animated.Value(0));
  const top = useRef(new Animated.Value(-20));

  const interpolate = (inputRange, outputRange) =>
    scrollY.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp'
    });

  const initialFadeIn = () => {
    Animated.timing(opacity.current, {
      toValue: 1,
      duration: 400,
      delay: 100
    }).start();
    Animated.timing(top.current, {
      toValue: 0,
      duration: 400,
      delay: 100,
      easing: easing.easeInOutQuart
    }).start();
  };

  useEffect(() => {
    initialFadeIn();
  }, []);

  const { address, lockedBalance, isMultisignature } = account;

  return <Animated.View
    style={[
      { height: interpolate([0, 320], [320, 0]) },
      {
        top: top.current,
        opacity: opacity.current,
        paddingBottom: interpolate([0, 320], [15, 0])
      },
    ]}
  >
    <Profile
      t={t}
      priceTicker={priceTicker}
      account={account}
      settings={settings}
      interpolate={interpolate}
      height={260}
      address={address}
      lockedBalance={lockedBalance}
      isMultiSignature={isMultisignature}
      navigation={navigation}
    />
  </Animated.View>;
};

export const AccountSummary = withTheme(translate()(AccountSummaryScreen), getStyles());
