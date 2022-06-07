/* eslint-disable max-statements */
import React, { Fragment, useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { translate } from 'react-i18next';
import RNShake from 'react-native-shake';
import easing from 'utilities/easing';
import { settingsUpdated } from 'modules/Settings/actions';
import { H3 } from 'components/shared/toolBox/typography';
import withTheme from 'components/shared/withTheme';
import { useDispatch, useSelector } from 'react-redux';
import List from './List';
import Footer from './Footer';
import getStyles from './styles';

const Manager = ({
  type,
  styles,
  transactions,
  navigate,
  account,
  footer,
  t,
  noTitle
}) => {
  const {
    incognito: incognitoMode, token:
    { active: activeToken }
  } = useSelector(state => state.settings);
  const followedAccounts = useSelector(state => state.accounts.followed);
  const dispatch = useDispatch();
  const incognito = type === 'home' && incognitoMode;
  const Anim = Animated.View;

  const opacity = useRef(new Animated.Value(0));
  const top = useRef(new Animated.Value(20));

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
    let timeout = null;
    if (type === 'home') {
      RNShake.addEventListener('ShakeEvent', () => {
        if (!timeout) {
          dispatch(settingsUpdated({
            incognito: !incognitoMode
          }));
          timeout = setTimeout(() => {
            timeout = false;
          }, 1000);
        }
      });
    }
    initialFadeIn();
    return () => {
      clearTimeout(timeout);
      RNShake.removeEventListener('ShakeEvent');
    };
  }, []);

  return <Anim style={[styles.container, styles.theme.container, { opacity: opacity.current, top: top.current }]} testID="transactions-list-manager" >
    {!transactions
      || (transactions.confirmed.length === 0 && transactions.pending.length === 0) ? (
      <Fragment />
      ) : (
      <Fragment>
        {noTitle ? null : (
          <View style={styles.innerContainer}>
            <H3 style={[styles.title, styles.theme.title]}>{t('Activity')}</H3>
          </View>
        )}
        <List
          incognito={incognito}
          navigate={navigate}
          account={account ? account.address : ''}
          followedAccounts={followedAccounts ?? {}}
          pending={transactions.pending}
          activeToken={activeToken}
          transactions={transactions.confirmed}
        />
        {footer ? <Footer /> : null}
      </Fragment>
      )}
  </Anim>;
};

export default withTheme(translate()(Manager), getStyles());
