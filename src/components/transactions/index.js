import React, { Fragment } from 'react';
import { View, Animated } from 'react-native';
import connect from 'redux-connect-decorator';
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
  settings: state.settings,
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
    this.initialFadeIn();
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
    this.props.settingsUpdated({
      incognito: !this.props.settings.incognito,
    });
  }

  render() {
    const {
      styles, transactions, navigate, account, footer, settings,
    } = this.props;
    const balance = account ? parseFloat(fromRawLsk(account.balance)) : '';
    const Anim = Animated.View;
    const { opacity, top } = this.state.initialAnimations;

    return (<Anim style={[styles.container, { opacity, top }]}>
      {
        (!transactions ||
          (transactions.confirmed.length === 0 && transactions.pending.length === 0)) ?
          <Fragment></Fragment> :
          <Fragment>
            <View style={styles.heading}>
              <H3 style={styles.title}>Activity</H3>
              <IconButton
                title=''
                icon={settings.incognito ? 'disable-incognito' : 'enable-incognito'}
                color={colors.dark.gray2}
                iconSize={18}
                onClick={this.toggleIncognito}
                />
            </View>
            {!account.initialized && balance >= 0.2 ?
              <View style={styles.initContainer}>
                <Icon name='warning' color={colors.light.red} size={18} />
                <Small style={styles.initText}>Your account is not initialized.
                  <A
                    style={styles.link}
                    onPress={this.onPress}> Initialize it now</A>
                </Small>
              </View> : null
            }
            <List
              navigate={navigate}
              account={account ? account.address : ''}
              pending={transactions.pending}
              transactions={transactions.confirmed} />
            {
              footer ? <Footer /> : null
            }
          </Fragment>
      }
    </Anim>);
  }
}

export default withTheme(Transactions, getStyles());
