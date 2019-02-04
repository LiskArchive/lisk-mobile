import React from 'react';
import { View, Animated } from 'react-native';
import { translate } from 'react-i18next';
import LottieView from 'lottie-react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { bioMetricAuthentication } from '../../utilities/passphrase';
import Icon from '../toolBox/icon';
import styles from './styles';
import { colors } from '../../constants/styleGuide';
import { P, A } from '../toolBox/typography';
import waves from '../../assets/animations/waves.json';
import wavesError from '../../assets/animations/waves-error.json';


class BiometricAuth extends React.Component {
  state = {
    opacity: new Animated.Value(0),
    tried: false,
  }

  startUpAnimation = (callback) => {
    this.startUpAnimEl.play();
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: this.props.animate ? 300 : 0,
    }).start();
    this.timeout = setTimeout(() => {
      callback();
    }, 1500);
  }

  unauthorizedAnimation = () => {
    this.setState({ tried: true }, () => {
      this.unAuthAnimEl.play();
    });
  }

  componentDidMount() {
    this.startUpAnimation(() => {
      bioMetricAuthentication({
        successCallback: () => this.props.signIn(this.props.passphrase, 'biometricAuth'),
        androidError: this.unauthorizedAnimation,
      });
    });
  }

  componentWillUnmount() { // eslint-disable-line
    FingerprintScanner.release();
    clearTimeout(this.timeout);
  }

  render() {
    const { t, sensorType, toggleView } = this.props;
    const { opacity, tried } = this.state;

    return (<View style={styles.container}>
      <View style={styles.titleContainer}>
        <Animated.Text style={[styles.title, { opacity }]}>
          { sensorType === 'Face ID' ?
            t('Look at the front camera to authenticate.') :
            t('Place your finger over the touch sensor to authenticate.')
          }
        </Animated.Text>
      </View>
      <View style={styles.waves}>
        {
          tried ?
          <LottieView
            source={wavesError}
            loop={false}
            style={{}}
            ref={(el) => { this.unAuthAnimEl = el; }}/> :
          <LottieView
            source={waves}
            loop={false}
            style={{}}
            ref={(el) => { this.startUpAnimEl = el; }}/>
        }
        <Animated.View style={{ opacity }}>
          <Icon size={40} color={colors.light.white}
            name={ sensorType === 'Face ID' ? 'face-id-full' : 'touch-id-full'}
            style={styles.authTypeIcon} />
        </Animated.View>
      </View>
      <Animated.View style={[styles.linkWrapper, styles.column, { opacity }]}>
        <P style={[styles.question, styles.fillWidth, tried ? styles.error : styles.invisible]}>
          { t('Unauthorized! Please try again.') }
        </P>
        <P style={[styles.question, styles.fillWidth]}>
          {
            t(`Don't want to use ${sensorType}?`)
          }
        </P>
        <A
          style={[styles.link, styles.fillWidth]}
          onPress={() => toggleView({ view: 'form' })}>{t('Sign in manually')}</A>
      </Animated.View>
    </View>);
  }
}

export default translate()(BiometricAuth);
