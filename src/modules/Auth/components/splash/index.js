import React from 'react';
import { Animated, View } from 'react-native';
import Icon from 'components/shared/toolBox/icon';
import easing from 'utilities/easing';
import { deviceHeight } from 'utilities/device';
import { colors } from 'constants/styleGuide';
import withTheme from 'components/shared/withTheme';
import { translate } from 'react-i18next';
import Title from '../title';
import getStyles from './styles';

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
    const { bgOpacity, iconOpacity } = this.state;
    const { styles } = this.props;

    return (
      <View style={styles.splashContainer}>
        <Animated.View style={[styles.splashBg, { opacity: bgOpacity }]} />
        <Animated.View style={[styles.splashFigure, { opacity: iconOpacity }]}>
          <Icon name="lisk-full" size={55} color={colors.light.ultramarineBlue} />
          <Title>{this.props.t('The official Lisk mobile wallet.')}</Title>
        </Animated.View>
      </View>
    );
  }
}

export default withTheme(translate()(Splash), getStyles());
