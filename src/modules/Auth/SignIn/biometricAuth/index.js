/* eslint-disable no-nested-ternary */
/* eslint-disable complexity */
import React from 'react';
import { View, Animated } from 'react-native';
import { translate } from 'react-i18next';
import LottieView from 'lottie-react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { bioMetricAuthentication } from 'modules/Auth/utils';
import Icon from 'components/shared/toolBox/icon';
import { colors, themes } from 'constants/styleGuide';
import { P } from 'components/shared/toolBox/typography';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';
import waves from 'assets/animations/waves.json';
import withTheme from 'components/shared/withTheme';
import wavesError from 'assets/animations/waves-error.json';
import SignInSvg from 'assets/svgs/SignInSvg';
import SignInDarkSvg from 'assets/svgs/SignInDarkSvg';
import getStyles from './styles';
import CreateAccount from '../createAccount';
import Title from '../title';

class BiometricAuth extends React.Component {
  state = {
    opacity: new Animated.Value(0),
    tried: false,
    busy: false,
    biometricAuth: false
  };

  progress = new Animated.Value(0);

  animationLoop = true;

  runAnimation() {
    const value = this.progress._value;
    Animated.timing(this.progress, {
      toValue: value === 0 ? 1 : 0,
      duration: 2000
    }).start(() => {
      if (this.animationLoop) {
        this.runAnimation();
      }
    });
  }

  playUnAuthorizedAnimation = () => {
    this.animationLoop = 0;
    this.progress.setValue(1);
    this.setState({ tried: true, busy: false }, () => {
      this.animationLoop = false;
      this.unAuthAnimEl?.play();
    });
  };

  onClick = () => {
    this.setState({ busy: true, biometricAuth: true }, () => {
      this.runAnimation();
      bioMetricAuthentication({
        successCallback: () => {
          this.props.hideDialog(() => {
            this.props.signIn(this.props.passphrase, 'biometricAuth');
          });
        },
        errorCallback: () => {
          this.setState({ busy: false, biometricAuth: false });
          this.playUnAuthorizedAnimation();
        },
      });
    });
  };

  onCreateAccount = () => {
    this.props.navigation.navigate({ name: 'Register' });
  };

  componentDidUpdate(_, prevState) {
    if (prevState.biometricAuth !== this.state.biometricAuth && this.state.biometricAuth) {
      this.startUpAnimEl.play();
    }
  }

  componentDidMount() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: this.props.animate ? 300 : 0
    }).start();

    Animated.timing(this.progress, {
      toValue: 1,
      duration: 2500
    }).start();
  }

  // eslint-disable-next-line class-methods-use-this
  componentWillUnmount() {
    FingerprintScanner.release();
  }

  render() {
    const {
      t, sensorType, toggleView, styles, theme
    } = this.props;
    const {
      opacity, tried, busy, biometricAuth
    } = this.state;

    let pageTitle = t('Choose an authentication method');
    if (busy) {
      pageTitle = sensorType === 'Face ID'
        ? t('fingerprint.face_id')
        : t('fingerprint.touch_id');
    }

    return (
      <View style={[styles.container]}>
        <Title opacity={opacity}>{pageTitle}</Title>

        <View style={styles.waves}>
          {!biometricAuth ? theme === themes.dark ? <SignInDarkSvg /> : <SignInSvg /> : null}
          {biometricAuth && tried && (
            <LottieView
              source={wavesError}
              loop={false}
              style={{}}
              ref={(el) => {
                this.unAuthAnimEl = el;
              }}
            />
          )}
          {biometricAuth && !tried && (
            <LottieView
              source={waves}
              loop={false}
              style={{}}
              progress={this.progress}
              ref={(el) => {
                this.startUpAnimEl = el;
              }}
            />
          )}
          {biometricAuth && <Animated.View style={{ opacity }}>
            <Icon
              size={40}
              color={colors.light.white}
              name={sensorType === 'Face ID' ? 'face-id-full' : 'touch-id-full'}
              style={styles.authTypeIcon}
            />
          </Animated.View>}
        </View>

        <Animated.View style={[styles.linkWrapper, styles.column, { opacity }]}>
          <P style={[styles.question, styles.fillWidth, tried ? styles.error : styles.invisible]}>
            {t('Unauthorized! Please try again.')}
          </P>

          {!this.state.biometricAuth && (
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
                textStyle={
                  theme === themes.dark ? { color: colors.dark.white } : colors.light.zodiacBlue
                }
                title={t('Sign in manually')}
                onClick={toggleView}
                noTheme={true}
              />

              <CreateAccount onPress={this.onCreateAccount} opacity={opacity} />
            </View>
          )}
        </Animated.View>
      </View>
    );
  }
}

export default withTheme(translate()(BiometricAuth), getStyles());
