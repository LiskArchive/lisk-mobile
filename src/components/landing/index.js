import React from 'react';
import { View, Animated } from 'react-native';
import connect from 'redux-connect-decorator';
import SplashScreen from 'react-native-splash-screen';
import { activePeerSet as activePeerSetAction } from '../../actions/peers';
import {
  accountsRetrieved as accountsRetrievedAction,
  accountLoggedOut as accountLoggedOutAction,
} from '../../actions/accounts';
import Icon from '../toolBox/icon';
import easing from '../../utilities/easing';
import { deviceHeight } from '../../utilities/device';
import styles from './styles';
import { colors } from '../../constants/styleGuide';

// there is a warning in RNOS module. remove this then that warning is fixed
console.disableYellowBox = true;

/**
 * This component would be mounted first and would be used to config and redirect
 * the application to referer page or Login
 *
 * @todo Implement saved language detection
 * @todo Implement release notification
 * @todo Implement custom message: this can be used in case we need to notify the user
 * about any unforeseen issue/change
 */
@connect(state => ({
  accounts: state.accounts,
}), {
  peerSet: activePeerSetAction,
  accountsRetrieved: accountsRetrievedAction,
  accountLoggedOut: accountLoggedOutAction,
})
class Landing extends React.Component {
  state = {
    bgOpacity: new Animated.Value(1),
    iconOpacity: new Animated.Value(0),
    top: new Animated.Value((deviceHeight() / 2) + 16),
  }

  animate = (cb) => {
    Animated.timing(this.state.bgOpacity, {
      toValue: 0,
      duration: 900,
      delay: 50,
    }).start();
    Animated.timing(this.state.top, {
      toValue: 130,
      duration: 600,
      delay: 50,
      easing: easing.easeOutQuart,
    }).start();
    Animated.timing(this.state.iconOpacity, {
      toValue: 1,
      duration: 300,
      delay: 650,
    }).start(cb);
  }

  componentWillMount() {
    this.props.peerSet();
    this.props.accountsRetrieved();
  }

  componentDidMount() {
    SplashScreen.hide();
    this.animate(this.goToLogin);
    this.props.navigation.addListener(
      'didFocus',
      () => { this.props.accountLoggedOut(); },
    );
  }

  goToLogin = () => {
    this.props.navigation.navigate('Login');
  }

  /**
   * @todo this Text need to be replaced by a snipper component
   */
  // eslint-disable-next-line class-methods-use-this
  render() {
    const { top, bgOpacity, iconOpacity } = this.state;
    return (<View style={styles.container}>
      <Animated.View style={[styles.bg, { opacity: bgOpacity }]}></Animated.View>
      <Animated.View style={[styles.figure, styles.static, { opacity: iconOpacity }]}>
        <Icon name='lisk-full' size={60} color={colors.primary9} style={styles.logo} />
      </Animated.View>
      <Animated.View style={[styles.figure, styles.animating, { top }]}>
        <Icon name='lisk-full' size={60} color={colors.white} style={styles.logo} />
      </Animated.View>
    </View>);
  }
}

export default Landing;
