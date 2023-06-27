/* eslint-disable max-statements */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import i18next from 'i18next';
import Checkbox from 'components/shared/Checkbox';
import InfoToggler from 'components/shared/InfoToggler';
import { validateDerivationPath } from 'modules/Accounts/utils/accounts.utils';
import { useTheme } from 'contexts/ThemeContext';
import Input from 'components/shared/toolBox/input';
import { validateRecoveryPhrase, maskWords } from 'modules/Auth/utils';
import { P } from 'components/shared/toolBox/typography';
import { IconButton, PrimaryButton } from 'components/shared/toolBox/button';
import { colors } from 'constants/styleGuide';
import DropDownHolder from 'utilities/alert';
import { settingsUpdated } from 'modules/Settings/store/actions';

import getStyles from './RecoveryPhraseForm.styles';

const devDefaultRecoveryPhrase = process.env.RECOVERY_PHRASE || '';

export default function RecoveryPhraseForm({ onSubmit, onScanQrCode, lng, useDerivationPath }) {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const [showPassword, setShowPassword] = useState(false);
  const [blurred, setBlurred] = useState(false);
  const [focused, setFocused] = useState(false);
  const [mask, setMask] = useState('');
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

  const shouldShowMask = useMemo(
    () => blurred && !showPassword && !focused,
    [focused, blurred, showPassword]
  );

  const handleInputChange = (value) => {
    setRecoveryPhrase({
      value,
      validity: [],
    });
  };

  useEffect(() => {
    setMask(maskWords(recoveryPhrase.value));
  }, [recoveryPhrase.value]);

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

  const toggleUseDerivationPath = () => {
    dispatch(settingsUpdated({ useDerivationPath: !settings.useDerivationPath }));
  };

  const toggleDiscreteMode = () => {
    dispatch(settingsUpdated({ discrete: !settings.discrete }));
  };

  const onBlur = () => {
    setBlurred(true);
    setFocused(false);
  };
  const onFocus = () => {
    setFocused(true);
    setBlurred(false);
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
          value={shouldShowMask ? mask : recoveryPhrase.value}
          onChange={handleInputChange}
          autoCorrect={false}
          onBlur={onBlur}
          onFocus={onFocus}
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
          <>
            <View style={[styles.row]}>
              <P style={[styles.label, styles.theme.label]}>
                {i18next.t('commons.customDerivationPath')}
              </P>
              <InfoToggler
                title={i18next.t('commons.customDerivationPath')}
                style={{ toggleButton: styles.info }}
                description={i18next.t('auth.setup.customDerivationPathDescription')}
              />
            </View>
            <Input
              testID="derivation-path-input"
              onChange={setDerivationPath}
              value={derivationPath}
              error={derivationPathError && i18next.t('auth.register.error.invalidDerivationPath')}
            />
          </>
        )}
      </ScrollView>
      <Checkbox
        onPress={toggleUseDerivationPath}
        selected={!settings.useDerivationPath}
        style={{ container: styles.derivationPathContainer }}
      >
        <View style={styles.row}>
          <P>{i18next.t('settings.menu.enableDerivationPath')}</P>
          <InfoToggler
            title={i18next.t('auth.setup.enableLegacyAccount')}
            style={{ toggleButton: styles.info }}
            description={i18next.t('auth.setup.enableLegacyAccountDescription')}
          />
        </View>
      </Checkbox>
      <View style={styles.item}>
        <Checkbox onPress={toggleDiscreteMode} selected={settings.discrete}>
          <P>{i18next.t('auth.setup.enableDiscreteMode')}</P>
        </Checkbox>
      </View>
      <PrimaryButton
        testID="continue-button"
        onPress={onFormSubmission}
        disabled={!recoveryPhrase.value}
      >
        {i18next.t('commons.buttons.continue')}
      </PrimaryButton>
    </View>
  );
}
