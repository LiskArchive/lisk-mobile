/* eslint-disable max-statements */
import React, { useMemo, useState } from 'react';
import { View, Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import i18next from 'i18next';

import { validateDerivationPath } from 'modules/Accounts/utils/accounts.utils';
import { useTheme } from 'contexts/ThemeContext';
import Input from 'components/shared/toolBox/input';
import { validateRecoveryPhrase } from 'modules/Auth/utils';
import { P } from 'components/shared/toolBox/typography';
import { IconButton, PrimaryButton } from 'components/shared/toolBox/button';
import { colors } from 'constants/styleGuide';
import DropDownHolder from 'utilities/alert';

import getStyles from './styles';

const devDefaultRecoveryPhrase = process.env.RECOVERY_PHRASE || '';

export default function SecretRecoveryPhraseForm({
  onSubmit,
  onScanQrCode,
  lng,
  useDerivationPath,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [recoveryPhrase, setRecoveryPhrase] = useState({
    value: devDefaultRecoveryPhrase,
    validity: [],
  });
  const [derivationPath, setDerivationPath] = useState(`m/44'/134'/0'`);

  const { styles } = useTheme({ styles: getStyles() });

  const derivationPathError = useMemo(
    () => validateDerivationPath(derivationPath),
    [derivationPath]
  );

  const handleInputChange = (value) => {
    setRecoveryPhrase({
      value,
      validity: [],
    });
  };

  const onFormSubmission = () => {
    const secretRecoveryPhrase = recoveryPhrase.value;
    const normalizedRecoveryPhrase = secretRecoveryPhrase.trim();
    const validity = validateRecoveryPhrase(normalizedRecoveryPhrase);

    if (!validity.length) {
      DropDownHolder.closeAlert();
      onSubmit(normalizedRecoveryPhrase, derivationPath);
    } else {
      const errors = validity.filter(
        (item) => item.code !== 'INVALID_MNEMONIC' || validity.length === 1
      );
      if (errors.length && errors[0].message && errors[0].message.length) {
        const errorMessage = errors[0].message.replace(
          ' Please check the secret recovery phrase.',
          ''
        );
        DropDownHolder.error(i18next.t('Error'), errorMessage);
      }

      setRecoveryPhrase({
        recoveryPhrase: {
          value: normalizedRecoveryPhrase,
          validity,
        },
      });
    }
  };

  const onToggleRecoveryPhraseReveal = () => setShowPassword((prevState) => !prevState);

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
          testID="signInRecoveryPhaseInput"
          noTheme
          innerStyles={{
            input: [styles.input, styles.theme.input, showPassword ? styles.inputRevealed : null],
            containerStyle: styles.inputContainer,
          }}
          value={recoveryPhrase.value}
          onChange={handleInputChange}
          autoCorrect={false}
          multiline
          keyboardAppearance="light"
          autoFocus
          adornments={{
            right: (
              <IconButton
                onPress={onToggleRecoveryPhraseReveal}
                icon={showPassword ? 'eye-crossed' : 'eye'}
                iconSize={16}
                color={colors.light.ultramarineBlue}
              />
            ),
          }}
        />

        {useDerivationPath && (
          <Input
            testID="derivation-path-input"
            label={i18next.t('commons.customDerivationPath')}
            onChange={setDerivationPath}
            value={derivationPath}
            innerStyles={{ containerStyle: styles.derivationPathContainer }}
            error={derivationPathError && i18next.t('auth.register.error.invalidDerivationPath')}
          />
        )}
      </ScrollView>

      <PrimaryButton testID="continue-button" onPress={onFormSubmission}>
        {i18next.t('commons.buttons.continue')}
      </PrimaryButton>
    </View>
  );
}
