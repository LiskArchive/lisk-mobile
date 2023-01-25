import React from 'react';
import { Animated, View } from 'react-native';
import { translate } from 'react-i18next';

import easing from 'utilities/easing';
import { deviceHeight } from 'utilities/device';
import withTheme from 'components/shared/withTheme';
import LiskMobileLogoSvg from 'assets/svgs/LiskMobileLogoSvg';

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
      useNativeDriver: true,
    }).start();

    const topDuration = animate ? 600 : 0;
    const topDelay = animate ? 450 : 0;
    Animated.timing(this.state.top, {
      toValue: deviceHeight() <= 640 ? 70 : 130,
      duration: topDuration,
      delay: topDelay,
      easing: easing.easeOutQuart,
      useNativeDriver: true,
    }).start();

    const iconOpacityDuration = animate ? 300 : 0;
    const iconOpacityDelay = animate ? bgOpacityDuration + topDelay : 0;
    Animated.timing(this.state.iconOpacity, {
      toValue: 1,
      duration: iconOpacityDuration,
      delay: iconOpacityDelay,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const { bgOpacity, iconOpacity } = this.state;
    const { showSimplifiedView, t, styles, style } = this.props;

    return (
      <View style={[styles.splashContainer, style?.container]}>
        <Animated.View style={[styles.splashBg, { opacity: bgOpacity }, style?.bg]} />

        <Animated.View style={[styles.splashFigure, { opacity: iconOpacity }, style?.figure]}>
          <LiskMobileLogoSvg style={[style?.icon]} />

          {!showSimplifiedView && (
            <Title style={[style?.title]}>{t('The official Lisk mobile wallet.')}</Title>
          )}
        </Animated.View>
      </View>
    );
  }
}

export default withTheme(translate()(Splash), getStyles());
