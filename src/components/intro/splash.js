import React from 'react';
import { Animated, View } from 'react-native';
import Icon from '../toolBox/icon';
import easing from '../../utilities/easing';
import { deviceHeight } from '../../utilities/device';
import { P } from '../toolBox/typography';
import styles from './styles';
import { colors } from '../../constants/styleGuide';

class Splash extends React.Component {
  state = {
    bgOpacity: new Animated.Value(1),
    txtOpacity: new Animated.Value(0),
    iconOpacity: new Animated.Value(0),
    top: new Animated.Value((deviceHeight() / 2) + 16),
  }

  componentDidMount() {
    const {
      top, bgOpacity, iconOpacity, txtOpacity,
    } = this.state;

    Animated.timing(bgOpacity, {
      toValue: 0,
      duration: 900,
      delay: 50,
    }).start();
    Animated.timing(txtOpacity, {
      toValue: 1,
      duration: 900,
      delay: 650,
    }).start();
    Animated.timing(top, {
      toValue: (deviceHeight() / 2) - 50,
      duration: 600,
      delay: 50,
      easing: easing.easeOutQuart,
    }).start();
    Animated.timing(iconOpacity, {
      toValue: 1,
      duration: 300,
      delay: 650,
    }).start();
  }

  render() {
    const {
      top, bgOpacity, iconOpacity, txtOpacity,
    } = this.state;
    return (<View style={styles.splashContainer}>
      <Animated.View style={[styles.splashBg, { opacity: bgOpacity }]}></Animated.View>
      <Animated.View style={[styles.splashFigure, styles.splashStatic, { opacity: iconOpacity }]}>
        <Icon name='lisk-full' size={60} color={colors.light.actionBlue} style={styles.splashLogo} />
      </Animated.View>
      <Animated.View style={[styles.splashFigure, styles.splashAnimating, { top }]}>
        <Icon name='lisk-full' size={60} color={colors.light.white} style={styles.splashLogo} />
      </Animated.View>
      <Animated.View style={[styles.splashDescription, { opacity: txtOpacity }]}>
        <P style={styles.splashDescriptionP}>
          Welcome to Lisk. Now you can send{'\n'}
          and request LSK token on the go.
        </P>
      </Animated.View>
    </View>);
  }
}

export default Splash;
