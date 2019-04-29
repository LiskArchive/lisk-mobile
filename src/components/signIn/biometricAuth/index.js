import React from 'react';
import { Platform, View, Animated } from 'react-native';
import { translate } from 'react-i18next';
import LottieView from 'lottie-react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { bioMetricAuthentication } from '../../../utilities/passphrase';
import Icon from '../../toolBox/icon';
import styles from './styles';
import { colors } from '../../../constants/styleGuide';
import { P } from '../../toolBox/typography';
import { PrimaryButton, Button } from '../../toolBox/button';
import waves from '../../../assets/animations/waves.json';
import wavesError from '../../../assets/animations/waves-error.json';
import CreateAccount from '../createAccount';

class BiometricAuth extends React.Component {
  state = {
    opacity: new Animated.Value(0),
    tried: false,
    busy: false,
  }
  progress = new Animated.Value(0);
  animationLoop = true;

  runAnimation() {
    const value = this.progress._value;
    Animated.timing(this.progress, {
      toValue: value === 0 ? 1 : 0,
      duration: 2000,
    }).start(() => {
      if (this.animationLoop) {
        this.runAnimation();
      }
    });
  }

  playUnAuthorizedAnimation = () => {
    this.animationLoop = 0;
    this.progress.setValue(1);
    this.setState({ tried: true }, () => {
      this.animationLoop = false;
      this.unAuthAnimEl.play();
    });
  }

  onClick = () => {
    this.setState({ busy: true }, () => {
      if (Platform.OS === 'android') {
        this.runAnimation();
      }

      bioMetricAuthentication({
        successCallback: () => {
          this.props.hideDialog(() => {
            this.props.signIn(this.props.passphrase, 'biometricAuth');
          });
        },
        errorCallback: () => this.setState({ busy: false }),
        androidError: this.playUnAuthorizedAnimation,
      });
    });
  }

  onCreateAccount = () => {
    this.props.navigation.navigate('Register');
  }

  componentDidMount() {
    this.startUpAnimEl.play();

    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: this.props.animate ? 300 : 0,
    }).start();

    Animated.timing(this.progress, {
      toValue: 1,
      duration: 2500,
    }).start();
  }

  componentWillUnmount() { // eslint-disable-line
    FingerprintScanner.release();
  }

  render() {
    const { t, sensorType, toggleView } = this.props;
    const { opacity, tried, busy } = this.state;

    return (
      <View style={styles.container}>
        <View>
          <Animated.Text style={[styles.title, { opacity }]}>
            {t('Choose an authenticated method')}
          </Animated.Text>
        </View>

        <View style={styles.waves}>
          {tried ?
            <LottieView
              source={wavesError}
              loop={false}
              style={{}}
              ref={(el) => { this.unAuthAnimEl = el; }}
            /> :
            <LottieView
              source={waves}
              loop={false}
              style={{}}
              progress={this.progress}
              ref={(el) => { this.startUpAnimEl = el; }}
            />
          }

          <Animated.View style={{ opacity }}>
            <Icon
              size={40}
              color={colors.light.white}
              name={sensorType === 'Face ID' ? 'face-id-full' : 'touch-id-full'}
              style={styles.authTypeIcon}
            />
          </Animated.View>
        </View>

        <Animated.View style={[styles.linkWrapper, styles.column, { opacity }]}>
          <P style={[styles.question, styles.fillWidth, tried ? styles.error : styles.invisible]}>
            {t('Unauthorized! Please try again.')}
          </P>

          <View style={styles.column}>
            <PrimaryButton
              style={styles.button}
              title={busy ? t('Signing in...') : t('Sign in using bioAuth', { sensorType })}
              onClick={this.onClick}
              disabled={busy}
              noTheme={true}
            />

            <Button
              style={[styles.button, styles.buttonManualSignIn]}
              title={t('Sign in manually')}
              onClick={toggleView}
              noTheme={true}
            />

            <CreateAccount
              onPress={this.onCreateAccount}
              opacity={opacity}
            />
          </View>
        </Animated.View>
      </View>
    );
  }
}

export default translate()(BiometricAuth);
