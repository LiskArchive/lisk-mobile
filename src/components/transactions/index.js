import React, { Fragment } from 'react';
import { View, Animated, Platform, ActivityIndicator } from 'react-native';
import connect from 'redux-connect-decorator';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { translate } from 'react-i18next';
import RNShake from 'react-native-shake';
import {
  settingsUpdated as settingsUpdatedAction,
} from '../../actions/settings';
import List from './list';
import Footer from './footer';
import { H3, Small, A } from '../toolBox/typography';
import { fromRawLsk } from '../../utilities/conversions';
import Icon from '../toolBox/icon';
import colors from '../../constants/styleGuide/colors';
import easing from '../../utilities/easing';
import withTheme from '../withTheme';
import getStyles from './styles';
import { IconButton } from '../toolBox/button';

/**
 * This component is a HOC to decide which state to show:
 * Loading, Empty (No transactions) or the List view.
 *
 * It performs the initial animation after the user logged in.
 *
 */
@connect(state => ({
  incognitoMode: state.settings.incognito,
  activeToken: state.settings.token.active,
  followedAccounts: state.accounts.followed || [],
}), {
  settingsUpdated: settingsUpdatedAction,
})
class Transactions extends React.Component {
  state = {
    initialAnimations: {
      opacity: new Animated.Value(0),
      top: new Animated.Value(20),
    },
  }

  componentDidMount() {
    if (this.props.type === 'home') {
      RNShake.addEventListener('ShakeEvent', () => {
        this.props.settingsUpdated({
          incognito: !this.props.incognitoMode,
        });
      });
    }
    this.initialFadeIn();
  }
  componentWillUnmount() {//eslint-disable-line
    RNShake.removeEventListener('ShakeEvent');
  }

  initialFadeIn = () => {
    const { opacity, top } = this.state.initialAnimations;
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      delay: 100,
    }).start();
    Animated.timing(top, {
      toValue: 0,
      duration: 400,
      delay: 100,
      easing: easing.easeInOutQuart,
    }).start();
  }

  onPress = () => {
    this.props.navigate('Send', { initialize: true });
  }

  toggleIncognito = () => {
    ReactNativeHapticFeedback.trigger('selection');
    this.props.settingsUpdated({
      incognito: !this.props.incognitoMode,
    });
  }

  render() {
    const {
      styles, transactions, navigate, activeToken,
      account, footer, theme, incognitoMode,
      followedAccounts, refreshing, type, t,
    } = this.props;

    const incognito = type === 'home' && incognitoMode;
    const balance = account ? parseFloat(fromRawLsk(account.balance)) : '';
    const Anim = Animated.View;
    const { opacity, top } = this.state.initialAnimations;
    const height = type === 'home' ? 180 : 205;

    return (<Anim style={[styles.container, { opacity, top }]}>
      {
        (!transactions ||
          (transactions.confirmed.length === 0 && transactions.pending.length === 0)) ?
          <Fragment></Fragment> :
          <Fragment>
            <View style={[styles.placeholder, { height }]}>
              {(Platform.OS === 'ios' && refreshing) ? <ActivityIndicator size="large" /> : null}
            </View>
            <View style={styles.innerContainer}>
              <H3 style={[styles.title, styles.theme.title]}>{t('Activity')}</H3>
              {
                type === 'home' ?
                  <IconButton
                    title=''
                    icon={incognito ? 'disable-incognito' : 'enable-incognito'}
                    color={colors.dark.gray2}
                    iconSize={20}
                    onClick={this.toggleIncognito}
                  /> : null
              }
            </View>
            {type === 'home' && !account.initialized && balance >= 0.2 ?
              <View style={[styles.initContainer, styles.theme.initContainer]}>
                <Icon name='warning' color={colors[theme].red} size={18} />
                <Small style={[styles.initText, styles.theme.initText]}>
                  {t('Your account is not initialized.')}
                  <A style={[styles.link, styles.theme.link]}
                    onPress={this.onPress}> {t('Initialize it now')}</A>
                </Small>
              </View> : null
            }
            <List
              incognito={incognito}
              navigate={navigate}
              account={account ? account.address : ''}
              followedAccounts={followedAccounts}
              pending={transactions.pending}
              activeToken={activeToken}
              transactions={transactions.confirmed}
            />
            {
              footer ? <Footer /> : null
            }
          </Fragment>
      }
    </Anim>);
  }
}
export default withTheme(translate()(Transactions), getStyles());
