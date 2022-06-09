import React, { useRef, useState } from 'react';
import { View, Keyboard } from 'react-native';
import { translate } from 'react-i18next';
import Input from 'components/shared/toolBox/input';
import { validatePassphrase } from 'modules/Auth/utils';
import KeyboardAwareScrollView from 'components/shared/toolBox/keyboardAwareScrollView';
import Scanner from 'components/shared/scanner';
import { IconButton } from 'components/shared/toolBox/button';
import { colors } from 'constants/styleGuide';
import withTheme from 'components/shared/withTheme';
import DropDownHolder from 'utilities/alert';
import getStyles from './styles';
import CreateAccount from '../createAccount';

const devDefaultPass = process.env.passphrase || '';

const Form = ({
  t,
  navigation,
  lng,
  signIn,
  showSimplifiedView,
  styles,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passphrase, setPassphrase] = useState({
    value: devDefaultPass,
    validity: [],
  });

  const scanner = useRef();

  const onInputChange = (value) => {
    setPassphrase(
      {
        passphrase: {
          value,
          validity: [],
        },
      }
    );
  };

  const goToRegistration = () => {
    Keyboard.dismiss();
    navigation.navigate({ name: 'Register' });
  };

  const onFormSubmission = (passphrase) => {
    const normalizedPassphrase = passphrase.trim();
    const validity = validatePassphrase(normalizedPassphrase);

    if (!validity.length) {
      DropDownHolder.closeAlert();
      signIn(normalizedPassphrase);
    } else {
      const errors = validity.filter(
        item => item.code !== 'INVALID_MNEMONIC' || validity.length === 1
      );
      if (errors.length && errors[0].message && errors[0].message.length) {
        const errorMessage = errors[0].message.replace(
          ' Please check the passphrase.',
          ''
        );
        DropDownHolder.error(t('Error'), errorMessage);
      }

      setPassphrase({
        passphrase: {
          value: normalizedPassphrase,
          validity,
        },
      });
    }
  };

  const onQRCodeRead = value => {
    onInputChange(value);
    onFormSubmission(value);
  };

  const onTogglePassphraseReveal = () =>
    setShowPassword(prevState => !prevState);

  const toggleCamera = () => {
    scanner.current.toggleCamera();
    Keyboard.dismiss();
  };

  return <View
    style={
      showSimplifiedView ? styles.containerSimplified : styles.container
    }
    testID="secretPhraseForm"
  >
    <KeyboardAwareScrollView
      noTheme={true}
      button={t('commons.buttons.continue')}
      buttonTestID="continueButton"
      onSubmit={onFormSubmission}
    >
      <Scanner
        reference={scanner}
        containerStyles={{
          cameraRoll: styles.cameraRoll,
          cameraOverlay: styles.cameraOverlay,
        }}
        fullScreen={true}
        navigation={navigation}
        readFromCameraRoll={false}
        onQRCodeRead={onQRCodeRead}
        permissionDialogTitle={t('Permission to use camera')}
        permissionDialogMessage={t('Lisk needs to connect to your camera')}
      />

      <Input
        testID="signInPassphraseInput"
        noTheme={true}
        label={t('commons.secret_recovery_phrase')}
        innerStyles={{
          input: [
            styles.input,
            styles.theme.input,
            showPassword ? styles.inputRevealed : null,
          ],
          inputLabel: [styles.label, styles.theme.label]
        }}
        value={passphrase.value}
        onChange={onInputChange}
        autoCorrect={false}
        multiline={true}
        keyboardAppearance="light"
        autoFocus
      />

      <IconButton
        onPress={onTogglePassphraseReveal}
        icon={showPassword ? 'eye-crossed' : 'eye'}
        iconSize={16}
        color={colors.light.ultramarineBlue}
        style={styles.passphraseRevealButton}
      />

      <IconButton
        onPress={toggleCamera}
        titleStyle={[styles.scanButtonTitle, styles.theme.scanButtonTitle]}
        style={[styles.scanButton, lng === 'de' ? styles.longTitle : null]}
        title={t('Scan')}
        icon="scanner"
        iconSize={16}
        color={colors.light.ultramarineBlue}
      />
    </KeyboardAwareScrollView>
  </View>;
};

export default withTheme(translate()(Form), getStyles());
