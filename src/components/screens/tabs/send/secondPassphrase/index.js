import React from 'react';
import { View, Platform, Image } from 'react-native';
import { translate } from 'react-i18next';
import { validatePassphrase } from '../../../../../utilities/passphrase';
import { extractPublicKey } from '../../../../../utilities/api/lisk/account';
import Input from '../../../../shared/toolBox/input';
import { IconButton } from '../../../../shared/toolBox/button';
import KeyboardAwareScrollView from '../../../../shared/toolBox/keyboardAwareScrollView';
import withTheme from '../../../../shared/withTheme';
import getStyles from './styles';
import { colors, themes } from '../../../../../constants/styleGuide';
import {
  deviceType,
  deviceHeight,
  SCREEN_HEIGHTS,
} from '../../../../../utilities/device';
import Scanner from '../../../../shared/scanner';
import DropDownHolder from '../../../../../utilities/alert';
import SecondPassPhraseDarkImg from '../../../../../assets/images/send/secondPassphrase3xDark.png';
import SecondPassPhraseLightImg from '../../../../../assets/images/send/secondPassphrase3xLight.png';
import HeaderBackButton from '../../../router/headerBackButton';

const devDefaultSecondPass = process.env.secondPassphrase || '';
const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;
const isAndroid = deviceType() === 'android';

class SecondPassphrase extends React.Component {
  state = {
    secondPassphrase: {
      value: devDefaultSecondPass,
    },
  };

  componentDidMount() {
    const {
      prevStep,
      navigation: { setOptions },
    } = this.props;

    setOptions({
      title: isSmallScreen ? 'Send' : 'Confirm',
      headerLeft: props => <HeaderBackButton {...props} onPress={prevStep} safeArea={true} />,
    });

    if (isAndroid) {
      setTimeout(() => this.input.focus(), 250);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lng !== this.props.lng) {
      const {
        navigation: { setOptions },
      } = this.props;
      setOptions({
        title: isSmallScreen ? 'Send' : 'Confirm',
      });
    }
  }

  validator = passphrase => {
    const validity = validatePassphrase(passphrase);
    const { accounts, settings, t } = this.props;

    if (
      validity.length === 0 &&
      extractPublicKey(passphrase) !==
        accounts.info[settings.token.active].secondPublicKey
    ) {
      validity.push({
        code: 'dose_not_belong',
        message: t('This is not your second passphrase.'),
      });
    }

    return validity;
  };

  changeHandler = (value, cb) => {
    this.setState(
      {
        secondPassphrase: { value },
      },
      () => {
        if (typeof cb === 'function') {
          cb();
        }
      }
    );
  };

  onOpenCamera = () => {
    this.input.blur();
    this.scanner.toggleCamera();
  };

  onCloseCamera = () => {
    this.props.navigation.setParams({
      showButtonLeft: true,
      headerLeft: props => <HeaderBackButton {...props} onPress={() => prevStep()} safeArea={true} />,
    });
  };

  onQRCodeRead = value => {
    this.changeHandler(value, this.onSubmit);
  };

  onSubmit = () => {
    const { t, nextStep, sharedData } = this.props;
    const { secondPassphrase } = this.state;
    const validity = this.validator(secondPassphrase.value);

    if (validity.length) {
      let errorMessage = '';

      const error = validity.filter(
        item => item.code !== 'INVALID_MNEMONIC' || validity.length === 1
      );

      if (error.length) {
        errorMessage =
          error[0].message && error[0].message.length > 0
            ? error[0].message.replace(' Please check the passphrase.', '')
            : '';
      }

      DropDownHolder.error(t('Error'), errorMessage);

      return this.setState({
        secondPassphrase: {
          value: secondPassphrase.value,
        },
      });
    }

    DropDownHolder.closeAlert();

    return nextStep({
      ...sharedData,
      secondPassphrase: secondPassphrase.value,
    });
  };

  render() {
    const {
      navigation, styles, t, lng, theme
    } = this.props;
    const { secondPassphrase } = this.state;

    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <Scanner
          ref={el => {
            this.scanner = el;
          }}
          containerStyles={{
            cameraRoll: styles.cameraRoll,
            cameraOverlay: styles.cameraOverlay,
          }}
          navigation={navigation}
          readFromCameraRoll={false}
          onQRCodeRead={this.onQRCodeRead}
          onClose={this.onCloseCamera}
          permissionDialogTitle={t('Permission to use camera')}
          permissionDialogMessage={t('Lisk needs to connect to your camera')}
        />
        <KeyboardAwareScrollView
          viewIsInsideTab
          onSubmit={this.onSubmit}
          hasTabBar={true}
          styles={{ innerContainer: styles.innerContainer }}
          button={{
            title: t('Continue'),
            type: 'inBox',
          }}
        >
          <View style={styles.container}>
            <Input
              label={t('Second Passphrase')}
              reference={ref => {
                this.input = ref;
              }}
              innerStyles={{
                input: styles.input,
                containerStyle: styles.inputContainer,
                inputLabel: styles.theme.label,
              }}
              value={secondPassphrase.value}
              onChange={this.changeHandler}
              autoFocus={!isAndroid}
              autoCorrect={false}
              multiline={Platform.OS === 'ios'}
              secureTextEntry={Platform.OS !== 'ios'}
            />

            {secondPassphrase.value === '' ? (
              <IconButton
                onPress={this.onOpenCamera}
                titleStyle={[
                  styles.scanButtonTitle,
                  styles.theme.scanButtonTitle,
                ]}
                style={[
                  styles.scanButton,
                  lng === 'de' ? styles.longTitle : null,
                ]}
                title={t('Scan')}
                icon="scanner"
                iconSize={19.5}
                color={colors.light.ultramarineBlue}
              />
            ) : null}
            <View style={styles.imageContainer}>
              <Image
                source={
                  theme === themes.light
                    ? SecondPassPhraseLightImg
                    : SecondPassPhraseDarkImg
                }
                style={styles.illustration}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withTheme(translate()(SecondPassphrase), getStyles());
