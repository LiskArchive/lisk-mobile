import React from 'react';
import connect from 'redux-connect-decorator';
import { View, Image, Platform } from 'react-native';
import { validatePassphrase } from '../../../utilities/passphrase';
import { extractPublicKey } from '../../../utilities/api/account';
import Input from '../../toolBox/input';
import { P } from '../../toolBox/typography';
import { IconButton } from '../../toolBox/button';
import KeyboardAwareScrollView from '../../toolBox/keyboardAwareScrollView';
import secondPassphraseImageLight from '../../../assets/images/secondPassphrase3xLight.png';
import secondPassphraseImageDark from '../../../assets/images/secondPassphrase3xDark.png';
import withTheme from '../../withTheme';
import getStyles from './styles';
import { colors, themes } from '../../../constants/styleGuide';
import { deviceType, deviceHeight, SCREEN_HEIGHTS } from '../../../utilities/device';
import Scanner from '../../scanner';

const devDefaultSecondPass = process.env.secondPassphrase || '';
const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;
const isAndroid = deviceType() === 'android';

@connect(state => ({
  peers: state.peers,
  accounts: state.accounts,
}), {})
class Confirm extends React.Component {
  state = {
    secondPassphrase: {
      value: devDefaultSecondPass,
      validity: devDefaultSecondPass ? validatePassphrase(devDefaultSecondPass) : [],
    },
  };

  componentDidMount() {
    this.props.navigation.setParams({
      title: isSmallScreen ? 'Confirm' : 'Send',
      showButtonLeft: true,
      action: () => this.props.prevStep(),
    });

    if (isAndroid) {
      setTimeout(() => this.input.focus(), 250);
    }
  }

  validator = (passphrase) => {
    const validity = validatePassphrase(passphrase);

    if (
      validity.length === 0 &&
      (extractPublicKey(passphrase) !== this.props.accounts.active.secondPublicKey)
    ) {
      validity.push({
        code: 'dose_not_belong',
        message: 'This is not your second passphrase.',
      });
    }

    return validity;
  }

  changeHandler = (value, cb) => {
    this.setState({
      secondPassphrase: {
        value,
        validity: [],
      },
    }, () => {
      if (typeof cb === 'function') {
        cb();
      }
    });
  }

  onOpenCamera = () => {
    this.input.blur();
    this.scanner.toggleCamera();
  }

  onCloseCamera = () => {
    this.props.navigation.setParams({
      showButtonLeft: true,
      action: () => this.props.prevStep(),
    });
  }

  onQRCodeRead = (value) => {
    this.changeHandler(value, this.onSubmit);
  }

  onSubmit = () => {
    const { secondPassphrase } = this.state;
    const validity = this.validator(secondPassphrase.value);

    if (validity.length) {
      this.setState({
        secondPassphrase: {
          value: secondPassphrase.value,
          validity,
        },
      });
    } else {
      this.props.nextStep({
        ...this.props.sharedData,
        secondPassphrase: this.state.secondPassphrase.value,
      });
    }
  }

  render() {
    const { navigation, styles, theme } = this.props;
    const { secondPassphrase } = this.state;

    let errorMessage = '';
    const error = secondPassphrase.validity
      .filter(item => item.code !== 'INVALID_MNEMONIC' || secondPassphrase.validity.length === 1);
    if (error.length) {
      errorMessage = (error[0].message && error[0].message.length > 0) ?
        error[0].message.replace(' Please check the passphrase.', '') :
        '';
    }

    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <Scanner
          ref={(el) => { this.scanner = el; }}
          containerStyles={{
            cameraRoll: styles.cameraRoll,
            cameraOverlay: styles.cameraOverlay,
          }}
          navigation={navigation}
          readFromCameraRoll={false}
          onQRCodeRead={this.onQRCodeRead}
          onClose={this.onCloseCamera}
        />

        <KeyboardAwareScrollView
          onSubmit={this.onSubmit}
          hasTabBar={true}
          styles={{ innerContainer: styles.innerContainer }}
          button={{
            title: 'Continue',
            type: 'inBox',
          }}>
          <View>
            {!isSmallScreen ? (
              <View style={styles.titleContainer}>
                <P style={[styles.subtitle, styles.theme.subtitle]}>
                  Enter your second passphrase to continue to transaction overview page.
                </P>
                <View style={styles.illustrationWrapper}>
                  {
                    theme === themes.light ?
                      <Image style={styles.illustration} source={secondPassphraseImageLight} /> :
                      <Image style={styles.illustration} source={secondPassphraseImageDark} />
                  }
                </View>
              </View>
            ) : null}

            <View>
              <Input
                label='Second Passphrase'
                reference={(ref) => { this.input = ref; }}
                innerStyles={{ input: styles.input }}
                value={secondPassphrase.value}
                onChange={this.changeHandler}
                autoFocus={!isAndroid}
                autoCorrect={false}
                multiline={Platform.OS === 'ios'}
                secureTextEntry={Platform.OS !== 'ios'}
                error={errorMessage}
              />
              {
                secondPassphrase.value === '' ?
                  <IconButton
                    onPress={this.onOpenCamera}
                    titleStyle={styles.scanButtonTitle}
                    style={styles.scanButton}
                    title='Scan'
                    icon='scanner'
                    iconSize={18}
                    color={colors.light.blue} /> : null
              }
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withTheme(Confirm, getStyles());
