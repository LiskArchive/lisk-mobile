import React from 'react';
import { Animated, View, Image } from 'react-native';
import Icon from '../../toolBox/icon';
import easing from '../../../utilities/easing';
import { deviceHeight } from '../../../utilities/device';
import styles from './styles';
import { colors } from '../../../constants/styleGuide';
import topBubbles from '../../../assets/images/topBubbles3x.png';
import christmasHat from '../../../assets/images/christmasHat.png';

class Splash extends React.Component {
  state = {
    bgOpacity: new Animated.Value(1),
    iconOpacity: new Animated.Value(0),
    top: new Animated.Value((deviceHeight() / 2) - 18),
    christmasHatContainerTop: new Animated.Value(-36),
  }

  componentDidMount() {
    const { animate } = this.props;

    const bgOpacityDuration = animate ? 900 : 0;
    const bgOpacityDelay = animate ? 450 : 0;
    Animated.timing(this.state.bgOpacity, {
      toValue: 0,
      duration: bgOpacityDuration,
      delay: bgOpacityDelay,
    }).start();

    const topDuration = animate ? 600 : 0;
    const topDelay = animate ? 450 : 0;
    Animated.timing(this.state.top, {
      toValue: deviceHeight() <= 640 ? 70 : 130,
      duration: topDuration,
      delay: topDelay,
      easing: easing.easeOutQuart,
    }).start();

    const iconOpacityDuration = animate ? 300 : 0;
    const iconOpacityDelay = animate ? (bgOpacityDuration + topDelay) : 0;
    Animated.timing(this.state.iconOpacity, {
      toValue: 1,
      duration: iconOpacityDuration,
      delay: iconOpacityDelay,
    }).start();

    const christmasHatDuration = animate ? 300 : 0;
    const christmasHatDelay = animate ? (iconOpacityDelay + 200) : 0;
    Animated.timing(this.state.christmasHatContainerTop, {
      toValue: -16,
      duration: christmasHatDuration,
      delay: christmasHatDelay,
    }).start();
  }

  render() {
    const {
      top,
      bgOpacity,
      iconOpacity,
      christmasHatContainerTop,
    } = this.state;

    const shouldShowChristmasHat = (new Date()).getFullYear() !== 2019;

    return (
      <View style={styles.splashContainer}>
        <Animated.View style={[styles.splashBg, { opacity: bgOpacity }]}></Animated.View>
        <Animated.View style={[styles.splashTopButtons]}>
          <Image source={topBubbles} style={styles.topBubbles} />
        </Animated.View>
        <Animated.View style={[styles.splashFigure, styles.splashStatic, { opacity: iconOpacity }]}>
          <Icon name='lisk-full' size={60} color={colors.light.actionBlue} style={styles.splashLogo} />
          {shouldShowChristmasHat ? (
            <Animated.View
              style={[styles.christmasHatContainer, { top: christmasHatContainerTop }]}
            >
              <Image source={christmasHat} style={styles.christmasHat} />
            </Animated.View>
          ) : null}
        </Animated.View>
        <Animated.View style={[styles.splashFigure, styles.splashAnimating, { top }]}>
          <Icon name='lisk-full' size={60} color={colors.light.white} style={styles.splashLogo} />
        </Animated.View>
      </View>
    );
  }
}

export default Splash;
