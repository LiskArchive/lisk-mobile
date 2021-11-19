import React from 'react';
import { Animated, View } from 'react-native';
import Icon from '../../../shared/toolBox/icon';
import easing from '../../../../utilities/easing';
import { deviceHeight } from '../../../../utilities/device';
import getStyles from './styles';
import { colors, themes } from '../../../../constants/styleGuide';
import withTheme from '../../../shared/withTheme';

class Splash extends React.Component {
  state = {
    bgOpacity: new Animated.Value(1),
    iconOpacity: new Animated.Value(0),
    top: new Animated.Value(deviceHeight() / 2 - 18),
  };

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
    const iconOpacityDelay = animate ? bgOpacityDuration + topDelay : 0;
    Animated.timing(this.state.iconOpacity, {
      toValue: 1,
      duration: iconOpacityDuration,
      delay: iconOpacityDelay,
    }).start();
  }

  render() {
    const { top, bgOpacity, iconOpacity } = this.state;
    const { showSimplifiedView, styles, theme } = this.props;

    return (
      <View style={styles.splashContainer}>
        <Animated.View style={[styles.splashBg, { opacity: bgOpacity }]} />

        <Animated.View
          style={
            showSimplifiedView
              ? [
                styles.splashFigure,
                styles.splashStaticSimplified,
                { opacity: iconOpacity },
              ]
              : [
                styles.splashFigure,
                styles.splashStatic,
                { opacity: iconOpacity },
              ]
          }
        >
          <Icon
            name="lisk-full"
            size={55}
            color={colors.light.ultramarineBlue}
          />
        </Animated.View>

        <Animated.View
          style={[styles.splashFigure, styles.splashAnimating, { top }]}
        >
          <Icon
            name="lisk-full"
            size={55}
            color={ theme === themes.light ? colors.light.white : colors.dark.black}
            style={styles.splashLogo}
          />
        </Animated.View>
      </View>
    );
  }
}

export default withTheme(Splash, getStyles());
