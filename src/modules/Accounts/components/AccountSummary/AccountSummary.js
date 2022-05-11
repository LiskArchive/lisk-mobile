/* eslint-disable max-statements */
import React, { useEffect, useRef } from 'react';
import { Animated, } from 'react-native';
import { translate } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import easing from 'utilities/easing';
import { settingsUpdated as settingsUpdatedAction } from 'modules/Settings/actions';
import { tokenKeys } from 'constants/tokens';
import withTheme from 'components/shared/withTheme';
import Profile from '../Profile';
import getStyles from './styles';

const AccountSummaryScreen = ({ t, scrollY, navigation }) => {
  const settings = useSelector(state => state.settings);
  const accounts = useSelector(state => state.accounts);
  const activeToken = useSelector(state => state.settings.token.active);
  const priceTicker = useSelector(state => state.service.priceTicker);
  const dispatch = useDispatch();

  const settingsUpdated = (data) => {
    dispatch(settingsUpdatedAction(data));
  };

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

  const renderProfile = (data) => {
    const token = Object.keys(settings.token.list)[data.index];
    const { address, lockedBalance, isMultisignature } = accounts.info[activeToken];
    return <Profile
      t={t}
      key={token}
      token={token}
      priceTicker={priceTicker}
      account={data.item}
      settings={settings}
      interpolate={interpolate}
      height={260}
      address={address}
      lockedBalance={lockedBalance}
      isMultiSignature={isMultisignature}
      settingsUpdated={settingsUpdated}
      incognito={settings.incognito}
      navigation={navigation}
    />;
  };

  const { info } = accounts;
  const { token } = settings;

  const profiles = tokenKeys.filter((key) => token.list[key]).map((key) => info[key]);

  return <Animated.View
    style={[
      { height: interpolate([0, 280], [280, 0]) },
      {
        top: top.current,
        opacity: opacity.current,
        paddingBottom: interpolate([0, 280], [15, 0])
      },
    ]}
  >
    {renderProfile({ item: profiles[0], index: 0 })}
  </Animated.View>;
};

export const AccountSummary = withTheme(translate()(AccountSummaryScreen), getStyles());
