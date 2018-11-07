import React from 'react';
import { Animated, View, Image } from 'react-native';
import Icon from '../toolBox/icon';
import easing from '../../utilities/easing';
import { deviceHeight } from '../../utilities/device';
import styles from './styles';
import { colors } from '../../constants/styleGuide';
import topBubbles from '../../assets/images/topBubbles3x.png';

class Splash extends React.Component {
  state = {
    bgOpacity: new Animated.Value(1),
    iconOpacity: new Animated.Value(0),
    top: new Animated.Value((deviceHeight() / 2) - 18),
  }

  componentDidMount() {
    // If animate is not true, set all the durations to zero (no-animation)
    const { animate } = this.props;
    Animated.timing(this.state.bgOpacity, {
      toValue: 0,
      duration: animate ? 900 : 0,
      delay: animate ? 450 : 0,
    }).start();
    Animated.timing(this.state.top, {
      toValue: deviceHeight() <= 640 ? 60 : 130,
      duration: animate ? 600 : 0,
      delay: animate ? 450 : 0,
      easing: easing.easeOutQuart,
    }).start();
    Animated.timing(this.state.iconOpacity, {
      toValue: 1,
      duration: animate ? 300 : 0,
      delay: animate ? 1350 : 0,
    }).start();
  }

  render() {
    const { top, bgOpacity, iconOpacity } = this.state;
    return (<View style={styles.splashContainer}>
      <Animated.View style={[styles.splashBg, { opacity: bgOpacity }]}></Animated.View>
      <Animated.View style={[styles.splashTopButtons]}>
        <Image source={topBubbles} style={{ width: '100%', height: '100%' }} />
      </Animated.View>
      <Animated.View style={[styles.splashFigure, styles.splashStatic, { opacity: iconOpacity }]}>
        <Icon name='lisk-full' size={60} color={colors.primary9} style={styles.splashLogo} />
      </Animated.View>
      <Animated.View style={[styles.splashFigure, styles.splashAnimating, { top }]}>
        <Icon name='lisk-full' size={60} color={colors.white} style={styles.splashLogo} />
      </Animated.View>
    </View>);
  }
}

export default Splash;
