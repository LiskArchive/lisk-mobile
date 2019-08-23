import React from 'react';
import { View, Animated } from 'react-native';
import { translate } from 'react-i18next';
import styles from './styles';
import Input from '../../../shared/toolBox/input';
import { validatePassphrase } from '../../../../utilities/passphrase';
import KeyboardAwareScrollView from '../../../shared/toolBox/keyboardAwareScrollView';
import Scanner from '../../../shared/scanner';
import { IconButton } from '../../../shared/toolBox/button';
import { colors } from '../../../../constants/styleGuide';
import DropDownHolder from '../../../../utilities/alert';
import CreateAccount from '../createAccount';
import Title from '../title';

const devDefaultPass = process.env.passphrase || '';

const BackButton = ({
  toggleView, sensorType, t,
}) => (
  <IconButton
    onPress={toggleView}
    titleStyle={styles.backButtonTitle}
    style={styles.backButton}
    title={t('Use bioAuth', { sensorType })}
    icon='back'
    iconSize={20}
    color={colors.light.ultramarineBlue} />
);

class Form extends React.Component {
  state = {
    revealPassphrase: false,
    passphrase: {
      value: devDefaultPass,
      validity: [],
    },
    animation: {
      opacity: new Animated.Value(0),
    },
  };

  showKeyboard = () => {
    setTimeout(() => {
      if (this.props.navigation.isFocused() && this.passphraseInput) {
        this.passphraseInput.focus();
      }
    }, 500);
  }

  onInputChange = (value, cb) => {
    this.setState({
      passphrase: {
        value,
        validity: [],
      },
    }, () => {
      if (typeof cb === 'function') cb(value);
    });
  }

  goToRegistration = () => {
    this.passphraseInput.blur();
    this.props.navigation.navigate('Register');
  }

  onFormSubmission = () => {
    const { passphrase } = this.state;
    const { t, signIn } = this.props;
    const normalizedPassphrase = passphrase.value.trim();
    const validity = validatePassphrase(normalizedPassphrase);

    if (!validity.length) {
      DropDownHolder.closeAlert();
      this.passphraseInput.blur();
      signIn(normalizedPassphrase, 'form');
    } else {
      const errors = validity
        .filter(item => item.code !== 'INVALID_MNEMONIC' || validity.length === 1);
      if (errors.length && errors[0].message && errors[0].message.length) {
        const errorMessage = errors[0].message.replace(' Please check the passphrase.', '');
        DropDownHolder.error(t('Error'), errorMessage);
      }

      this.setState({
        passphrase: {
          value: normalizedPassphrase,
          validity,
        },
      });
    }
  }

  onQRCodeRead = (value) => {
    this.onInputChange(value, this.onFormSubmission);
  }

  animate = () => {
    const { animate } = this.props;
    const { opacity } = this.state.animation;

    Animated.timing(opacity, {
      toValue: 1,
      duration: animate ? 400 : 0,
      delay: animate ? 200 : 0,
    }).start();
  }

  onTogglePassphraseReveal = () => {
    this.setState(prevState => ({
      revealPassphrase: !prevState.revealPassphrase,
    }));
  }

  toggleCamera = () => {
    this.passphraseInput.blur();
    this.scanner.toggleCamera();
  }

  componentDidMount() {
    this.showKeyboard();
    this.animate();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const {
      revealPassphrase, passphrase, animation: { opacity },
    } = this.state;

    const {
      t, navigation, lng, toggleView, sensorType, showBackButton,
    } = this.props;

    return (
      <View
        style={styles.container}
        testID="signInForm"
      >
        {
          showBackButton ?
            <BackButton
              toggleView={toggleView}
              sensorType={sensorType}
              t={t} /> : null
        }

        <Scanner
          ref={(el) => { this.scanner = el; }}
          containerStyles={{
            cameraRoll: styles.cameraRoll,
            cameraOverlay: styles.cameraOverlay,
          }}
          fullScreen={true}
          navigation={navigation}
          readFromCameraRoll={false}
          onQRCodeRead={this.onQRCodeRead}
          permissionDialogTitle={t('Permission to use camera')}
          permissionDialogMessage={t('Lisk needs to connect to your camera')}
        />

        <Title opacity={opacity}>
          {t('The official Lisk mobile wallet.')}
        </Title>

        <Animated.View style={[{ opacity }]}>
          <Input
            testID="signInPassphraseInput"
            noTheme={true}
            label={t('Passphrase')}
            reference={(ref) => { this.passphraseInput = ref; }}
            innerStyles={{ input: [styles.input, revealPassphrase ? styles.inputRevealed : null] }}
            value={passphrase.value}
            onChange={this.onInputChange}
            autoFocus={false}
            autoCorrect={false}
            multiline={true}
            keyboardAppearance="light"
          />

          <IconButton
            onPress={this.onTogglePassphraseReveal}
            icon={revealPassphrase ? 'eye-crossed' : 'eye'}
            iconSize={16}
            color={colors.light.ultramarineBlue}
            style={styles.passphraseRevealButton}
          />

          <IconButton
            onPress={this.toggleCamera}
            titleStyle={styles.scanButtonTitle}
            style={[styles.scanButton, lng === 'de' ? styles.longTitle : null]}
            title={t('Scan')}
            icon='scanner'
            iconSize={16}
            color={colors.light.ultramarineBlue}
          />
        </Animated.View>

        <KeyboardAwareScrollView
          noTheme={true}
          button={t('Sign in')}
          buttonTestID='signInButton'
          onSubmit={this.onFormSubmission}
          footerContent={
            <CreateAccount
              style={styles.createAccountWrapper}
              onPress={this.goToRegistration}
              opacity={opacity}
            />
         }
        />
      </View>
    );
  }
}

export default translate()(Form);
