/* eslint-disable max-statements */
import React, { useMemo, useState } from 'react';
import { View, Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import i18next from 'i18next';

import { getDerivationPathErrorMessage } from 'modules/Accounts/utils/accounts.utils';
import { useTheme } from 'contexts/ThemeContext';
import Input from 'components/shared/toolBox/input';
import { validatePassphrase } from 'modules/Auth/utils';
import { P } from 'components/shared/toolBox/typography';
import { IconButton, PrimaryButton } from 'components/shared/toolBox/button';
import { colors } from 'constants/styleGuide';
import DropDownHolder from 'utilities/alert';

import getStyles from './styles';

const devDefaultPass = process.env.passphrase || '';

export default function SecretRecoveryPhraseForm({
  onSubmit,
  onScanQrCode,
  lng,
  useDerivationPath,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [passphrase, setPassphrase] = useState({
    value: devDefaultPass,
    validity: [],
  });
  const [derivationPath, setDerivationPath] = useState(`m/44'/134'/0'`);

  const { styles } = useTheme({ styles: getStyles() });

  const derivationPathError = useMemo(
    () => getDerivationPathErrorMessage(derivationPath),
    [derivationPath]
  );

  const handleInputChange = (value) => {
    setPassphrase({
      value,
      validity: [],
    });
  };

  const onFormSubmission = () => {
    const secretRecoveryPhrase = passphrase.value;
    const normalizedPassphrase = secretRecoveryPhrase.trim();
    const validity = validatePassphrase(normalizedPassphrase);

    if (!validity.length) {
      DropDownHolder.closeAlert();
      onSubmit(normalizedPassphrase, derivationPath);
    } else {
      const errors = validity.filter(
        (item) => item.code !== 'INVALID_MNEMONIC' || validity.length === 1
      );
      if (errors.length && errors[0].message && errors[0].message.length) {
        const errorMessage = errors[0].message.replace(' Please check the passphrase.', '');
        DropDownHolder.error(i18next.t('Error'), errorMessage);
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
    onScanQrCode();
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container} testID="secretPhraseForm">
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.labelContainer, styles.theme.labelContainer]}>
          <P style={[styles.label, styles.theme.label]}>
            {i18next.t('commons.secretRecoveryPhrase')}
          </P>

          <IconButton
            onPress={toggleCamera}
            titleStyle={[styles.scanButtonTitle, styles.theme.scanButtonTitle]}
            style={[lng === 'de' ? styles.longTitle : null]}
            title={i18next.t('Scan')}
            icon="scanner"
            iconSize={16}
            color={colors.light.ultramarineBlue}
          />
        </View>

        <Input
          testID="signInPassphraseInput"
          noTheme
          innerStyles={{
            input: [styles.input, styles.theme.input, showPassword ? styles.inputRevealed : null],
            containerStyle: styles.inputContainer,
          }}
          value={passphrase.value}
          onChange={handleInputChange}
          autoCorrect={false}
          multiline
          keyboardAppearance="light"
          autoFocus
          adornments={{
            right: (
              <IconButton
                onPress={onTogglePassphraseReveal}
                icon={showPassword ? 'eye-crossed' : 'eye'}
                iconSize={16}
                color={colors.light.ultramarineBlue}
              />
            ),
          }}
        />

        {useDerivationPath && (
          <View style={[styles.derivationPathContainer]}>
            <Input
              testID="derivation-path-input"
              label={i18next.t('commons.customDerivationPath')}
              onChange={setDerivationPath}
              value={derivationPath}
              error={derivationPathError && i18next.t('auth.register.error.invalidDerivationPath')}
            />
          </View>
        )}
      </ScrollView>

      <PrimaryButton testID="continue-button" onPress={onFormSubmission}>
        {i18next.t('commons.buttons.continue')}
      </PrimaryButton>
    </View>
  );
}
