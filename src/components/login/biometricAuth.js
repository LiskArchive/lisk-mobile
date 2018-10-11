import React from 'react';
import { View, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { bioMetricAuthentication } from '../../utilities/passphrase';
import Icon from '../toolBox/icon';
import styles from './styles';
import { colors } from '../../constants/styleGuide';
import { P, A } from '../toolBox/typography';
import waves from '../../assets/animations/waves.json';

class BiometricAuth extends React.Component {
  state = {
    opacity: new Animated.Value(0),
    tried: false,
  }

  animations = {
    startUp: null,
    unauthorized: null,
  }

  startUpAnimation = (callback) => {
    this.animations.startUp.play();
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: this.props.animate ? 300 : 0,
    }).start();
    setTimeout(() => {
      callback();
    }, 1500);
  }

  unauthorizedAnimation = () => {
    this.setState({ tried: true }, () => {
      this.animations.unauthorized.play();
    });
  }

  componentDidMount() {
    this.startUpAnimation(() => {
      bioMetricAuthentication(
        () => this.props.login({ value: this.props.passphrase }),
        () => this.unauthorizedAnimation(),
      );
    });
  }

  componentWillUnmount() { // eslint-disable-line
    FingerprintScanner.release();
  }

  render() {
    const { opacity, tried } = this.state;

    return (<View style={styles.container}>
      <View style={styles.titleContainer}>
        <Animated.Text style={[styles.title, { opacity }]}>
          Look at the front camera to authenticate.
        </Animated.Text>
      </View>
      <View style={styles.waves}>
        {
          tried ?
          // @todo The source of this animation must change
          <LottieView
            source={waves}
            loop={false}
            ref={(el) => { this.animations.unauthorized = el; }}/> :
          <LottieView
            source={waves}
            loop={false}
            ref={(el) => { this.animations.startUp = el; }}/>
        }
        <Animated.View style={{ opacity }}>
          <Icon size={40} color={colors.white}
            name={ this.props.sensorType === 'Face ID' ? 'face-id-full' : 'touch-id-full'}
            style={styles.authTypeIcon} />
        </Animated.View>
      </View>
      <Animated.View style={[styles.linkWrapper, styles.column, { opacity }]}>
        {
          tried ?
            <P style={[styles.question, styles.fillWidth]}>
              Unauthorized! Please try again.4
            </P> : null
        }
        <P style={[styles.question, styles.fillWidth]}>
          {
            `Don't want to use ${this.props.sensorType}?`
          }
        </P>
        <A
          style={[styles.link, styles.fillWidth]}
          onPress={() => this.props.toggleView('form')}>Sign in manually</A>
      </Animated.View>
    </View>);
  }
}

export default BiometricAuth;
