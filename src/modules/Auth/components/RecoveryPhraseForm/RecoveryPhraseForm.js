/* eslint-disable max-statements */
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import i18next from 'i18next';

import { usePasteFromClipboard } from 'hooks/usePasteFromClipboard';
import Checkbox from 'components/shared/Checkbox';
import InfoToggler from 'components/shared/InfoToggler';
import { validateDerivationPath } from 'modules/Accounts/utils/accounts.utils';
import { useTheme } from 'contexts/ThemeContext';
import Input from 'components/shared/toolBox/input';
import { validateRecoveryPhrase } from 'modules/Auth/utils';
import { P } from 'components/shared/toolBox/typography';
import { IconButton, PrimaryButton, LabelButton } from 'components/shared/toolBox/button';
import CopySvg from 'assets/svgs/CopySvg';
import CircleCheckedSvg from 'assets/svgs/CircleCheckedSvg';
import { colors } from 'constants/styleGuide';
import DropDownHolder from 'utilities/alert';
import { settingsUpdated } from 'modules/Settings/store/actions';
import { toSecureRecoveryPhraseString } from '../../utils/recoveryPhrase';

import getStyles from './RecoveryPhraseForm.styles';

const devDefaultRecoveryPhrase = process.env.RECOVERY_PHRASE || '';

export default function RecoveryPhraseForm({ onSubmit, onScanQrCode, lng, useDerivationPath }) {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const [showRecoveryPhrase, setShowRecoveryPhrase] = useState(false);
  const [focused, setFocused] = useState(false);
  const [recoveryPhrase, setRecoveryPhrase] = useState({
    value: devDefaultRecoveryPhrase,
    validity: [],
  });
  const [derivationPath, setDerivationPath] = useState(`m/44'/134'/0'`);

  const shouldShowMask = !(focused || showRecoveryPhrase);

  const passphraseValue = !shouldShowMask
    ? recoveryPhrase.value
    : toSecureRecoveryPhraseString(recoveryPhrase.value);

  const { styles } = useTheme({ styles: getStyles() });

  const derivationPathError = useMemo(
    () => validateDerivationPath(derivationPath),
    [derivationPath]
  );

  const [fetchClipboardValue, { isLoading: isLoadingClipboardValue, pasted }] =
    usePasteFromClipboard({
      onSuccess: (value) =>
        setRecoveryPhrase({
          value,
          validity: [],
        }),
    });

  const handleInputChange = (value) => {
    if (value && value === toSecureRecoveryPhraseString(value)) {
      return;
    }
    setRecoveryPhrase({
      value,
      validity: [],
    });
  };

  const handleSubmit = () => {
    const secretRecoveryPhrase = recoveryPhrase.value || '';
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

  const onToggleRecoveryPhraseReveal = () => setShowRecoveryPhrase((prevState) => !prevState);

  const toggleCamera = () => {
    onScanQrCode();
    Keyboard.dismiss();
  };

  const toggleUseDerivationPath = () =>
    dispatch(settingsUpdated({ useDerivationPath: !settings.useDerivationPath }));

  const toggleDiscreteMode = () => dispatch(settingsUpdated({ discrete: !settings.discrete }));

  return (
    <View style={styles.container} testID="secretPhraseForm">
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.labelContainer, styles.spaceBetween, styles.theme.labelContainer]}>
          <View style={[styles.row]}>
            <P style={[styles.label, styles.theme.label]}>
              {i18next.t('commons.secretRecoveryPhrase')}
            </P>

            <IconButton
              onPress={onToggleRecoveryPhraseReveal}
              icon={showRecoveryPhrase ? 'eye' : 'eye-crossed'}
              iconSize={16}
              color={colors.light.ultramarineBlue}
            />
          </View>

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
          value={passphraseValue}
          onChange={handleInputChange}
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          autoCorrect={false}
          multiline
          keyboardAppearance="light"
          autoFocus
          innerStyles={{
            input: [styles.input, styles.theme.input],
            containerStyle: styles.inputContainer,
          }}
        />

        <LabelButton
          onPress={fetchClipboardValue}
          disabled={isLoadingClipboardValue}
          textStyle={styles.labelButtonText}
          adornments={{
            right: pasted ? (
              <CircleCheckedSvg variant="fill" height={16} />
            ) : (
              <CopySvg height={16} />
            ),
          }}
        >
          {pasted
            ? i18next.t('commons.pastedFromClipboard')
            : i18next.t('commons.pasteFromClipboard')}
        </LabelButton>

        {useDerivationPath && (
          <>
            <View style={[styles.labelContainer]}>
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
              value={derivationPath}
              onChange={setDerivationPath}
              error={derivationPathError && i18next.t('auth.register.error.invalidDerivationPath')}
            />
          </>
        )}
      </ScrollView>

      <View style={[styles.derivationPathContainer]}>
        <Checkbox
          onPress={toggleUseDerivationPath}
          selected={!settings.useDerivationPath}
          style={{ container: styles.derivationPathContainer, children: styles.row }}
        >
          <P style={[styles.label, styles.theme.label]}>
            {i18next.t('settings.menu.enableDerivationPath')}
          </P>

          <InfoToggler
            title={i18next.t('auth.setup.enableLegacyAccount')}
            style={{ toggleButton: styles.info }}
            description={i18next.t('auth.setup.enableLegacyAccountDescription')}
          />
        </Checkbox>

        <Checkbox
          onPress={toggleDiscreteMode}
          selected={settings.discrete}
          style={{ container: styles.derivationPathContainer }}
        >
          <P style={[styles.label, styles.theme.label]}>
            {i18next.t('auth.setup.enableDiscreteMode')}
          </P>
        </Checkbox>
      </View>

      <PrimaryButton
        testID="continue-button"
        onPress={handleSubmit}
        disabled={!recoveryPhrase.value}
      >
        {i18next.t('commons.buttons.continue')}
      </PrimaryButton>
    </View>
  );
}
