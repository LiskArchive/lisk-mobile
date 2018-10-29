import React from 'react';
// import SplashScreen from 'react-native-splash-screen';
import { View } from 'react-native';
// import { deviceHeight } from '../../utilities/device';
import Splash from './splash';
// import easing from '../../utilities/easing';
// import Icon from '../toolBox/icon';
import styles from './styles';
// import Input from '../toolBox/input';
import { P } from '../toolBox/typography';
// import colors from '../../constants/styleGuide/colors';

class Request extends React.Component {
  state = {
    amount: { value: '', validity: -1 },
  };

  // state = {
  //   bgOpacity: new Animated.Value(1),
  //   iconOpacity: new Animated.Value(0),
  //   top: new Animated.Value((deviceHeight() / 2) + 16),
  // }

  // componentDidMount() {
  //   SplashScreen.hide();
  //   console.log('in Intro', (deviceHeight() / 2) - 16);
  //   // If animate is not true, set all the durations to zero (no-animation)
  //   const { animate } = this.props;
  //   Animated.timing(this.state.bgOpacity, {
  //     toValue: 0,
  //     duration: animate ? 900 : 0,
  //     delay: animate ? 50 : 0,
  //   }).start();
  //   Animated.timing(this.state.top, {
  //     toValue: deviceHeight() <= 640 ? 60 : 130,
  //     duration: animate ? 600 : 0,
  //     delay: animate ? 50 : 0,
  //     easing: easing.easeOutQuart,
  //   }).start();
  //   Animated.timing(this.state.iconOpacity, {
  //     toValue: 1,
  //     duration: animate ? 300 : 0,
  //     delay: animate ? 650 : 0,
  //   }).start();
  // }

  render() {
    const { top } = this.state;
    return (<View style={styles.wrapper}>
      <Splash />
      <View style={styles.container}>
        <P>{top}</P>
        {/* <Animated.View style={[styles.splashBg, { opacity: bgOpacity }]}></Animated.View>
        <Animated.View style={[styles.splashFigure, styles.splashStatic, { opacity: iconOpacity }]}>
          <Icon name='lisk-full' size={60} color={colors.primary9} style={styles.splashLogo} />
        </Animated.View>
        <Animated.View style={[styles.splashFigure, styles.splashAnimating, { top }]}>
          <Icon name='lisk-full' size={60} color={colors.white} style={styles.splashLogo} />
        </Animated.View> */}
      </View>
    </View>);
  }
}

export default Request;
