import React, { Fragment } from 'react';
import {
  View, Animated, Platform, ActivityIndicator
} from 'react-native';
import connect from 'redux-connect-decorator';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { translate } from 'react-i18next';
import RNShake from 'react-native-shake';
import { settingsUpdated as settingsUpdatedAction } from '../../../actions/settings';
import List from './list';
import Footer from './footer';
import { H3 } from '../toolBox/typography';
import colors from '../../../constants/styleGuide/colors';
import easing from '../../../utilities/easing';
import withTheme from '../withTheme';
import getStyles from './styles';
import { IconButton } from '../toolBox/button';

/**
 * This component is a HOC to decide which state to show:
 * Loading, Empty (No transactions) or the List view.
 *
 * It performs the initial animation after the user logged in.
 */
@connect(
  state => ({
    incognitoMode: state.settings.incognito,
    activeToken: state.settings.token.active,
    followedAccounts: state.accounts.followed || [],
  }),
  {
    settingsUpdated: settingsUpdatedAction,
  }
)
class Transactions extends React.Component {
  state = {
    initialAnimations: {
      opacity: new Animated.Value(0),
      top: new Animated.Value(20),
    },
  };

  componentDidMount() {
    let timeout = null;
    if (this.props.type === 'home') {
      RNShake.addEventListener('ShakeEvent', () => {
        if (!timeout) {
          this.props.settingsUpdated({
            incognito: !this.props.incognitoMode,
          });
          timeout = setTimeout(() => {
            timeout = false;
          }, 1000);
        }
      });
    }
    this.initialFadeIn();
  }

  // eslint-disable-next-line class-methods-use-this
  componentWillUnmount() {
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
  };

  toggleIncognito = () => {
    ReactNativeHapticFeedback.trigger('selection');
    this.props.settingsUpdated({
      incognito: !this.props.incognitoMode,
    });
  };

  render() {
    const {
      styles,
      transactions,
      navigate,
      activeToken,
      account,
      footer,
      incognitoMode,
      followedAccounts,
      type,
      t,
    } = this.props;

    const incognito = type === 'home' && incognitoMode;
    const Anim = Animated.View;
    const { opacity, top } = this.state.initialAnimations;

    return (
      <Anim style={[styles.container, { opacity, top }]}>
        {!transactions
          || (transactions.confirmed.length === 0
            && transactions.pending.length === 0) ? (
          <Fragment />
          ) : (
          <Fragment>
            <View style={styles.innerContainer}>
              <H3 style={[styles.title, styles.theme.title]}>
                {t('Activity')}
              </H3>
            </View>
            <List
              incognito={incognito}
              navigate={navigate}
              account={account ? account.address : ''}
              followedAccounts={followedAccounts}
              pending={transactions.pending}
              activeToken={activeToken}
                transactions={[...transactions.confirmed, ...transactions.confirmed, ...transactions.confirmed, ...transactions.confirmed]}
            />
            {footer ? <Footer /> : null}
          </Fragment>
          )}
      </Anim>
    );
  }
}
export default withTheme(translate()(Transactions), getStyles());
