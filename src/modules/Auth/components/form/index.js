import React, { useState } from 'react';
import { View, Keyboard } from 'react-native';
import { translate } from 'react-i18next';
import Input from 'components/shared/toolBox/input';
import { ScrollView } from 'react-native-gesture-handler';
import { validatePassphrase } from 'modules/Auth/utils';
import { IconButton, PrimaryButton } from 'components/shared/toolBox/button';
import { colors } from 'constants/styleGuide';
import withTheme from 'components/shared/withTheme';
import DropDownHolder from 'utilities/alert';
import getStyles from './styles';

const devDefaultPass = process.env.passphrase || '';

const Form = ({ t, scanQrCode, lng, signIn, styles }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passphrase, setPassphrase] = useState({
    value: devDefaultPass,
    validity: [],
  });

  const onInputChange = (value) => {
    setPassphrase({
      passphrase: {
        value,
        validity: [],
      },
    });
  };

  const onFormSubmission = (secretRecoveryPhrase = '') => {
    const normalizedPassphrase = secretRecoveryPhrase.trim();
    const validity = validatePassphrase(normalizedPassphrase);

    if (!validity.length) {
      DropDownHolder.closeAlert();
      signIn(normalizedPassphrase);
    } else {
      const errors = validity.filter(
        (item) => item.code !== 'INVALID_MNEMONIC' || validity.length === 1
      );
      if (errors.length && errors[0].message && errors[0].message.length) {
        const errorMessage = errors[0].message.replace(' Please check the passphrase.', '');
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

  const onTogglePassphraseReveal = () => setShowPassword((prevState) => !prevState);

  const toggleCamera = () => {
    scanQrCode();
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container} testID="secretPhraseForm">
      <ScrollView contentContainerStyle={styles.container}>
        <Input
          testID="signInPassphraseInput"
          noTheme={true}
          label={t('commons.secret_recovery_phrase')}
          innerStyles={{
            input: [styles.input, styles.theme.input, showPassword ? styles.inputRevealed : null],
            containerStyle: styles.inputContainer,
            inputLabel: [styles.label, styles.theme.label],
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
      </ScrollView>
      <PrimaryButton
        testID="continue-button"
        title={t('commons.buttons.continue')}
        onPress={() => onFormSubmission(passphrase.value)}
      />
    </View>
  );
};

export default withTheme(translate()(Form), getStyles());
