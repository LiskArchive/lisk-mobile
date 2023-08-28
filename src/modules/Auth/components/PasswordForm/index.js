import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import i18next from 'i18next';
import { useSelector } from 'react-redux';

import { useTheme } from 'contexts/ThemeContext';
import Avatar from 'components/shared/avatar';
import Input from 'components/shared/toolBox/input';
import { H3, P } from 'components/shared/toolBox/typography';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { colors, themes } from 'constants/styleGuide';
import useScreenshotPrevent from 'hooks/useScreenshotPrevent';

import getStyles from './styles';
import { getAccountPasswordFromKeyChain } from '../../utils/recoveryPhrase';

export default function PasswordForm({ account, onPress, testID, theme, onSubmit, style }) {
  useScreenshotPrevent();
  const [password, setPassword] = useState('');
  const { sensorType } = useSelector((state) => state.settings);

  const { styles } = useTheme({ styles: getStyles() });

  const fetchAccountPassword = async () => {
    const accountPassword = await getAccountPasswordFromKeyChain(account.metadata.address);
    return accountPassword;
  };

  const tryFetchAccontPasswordFromBiometrics = async () => {
    if (sensorType) {
      const accountPassword = await fetchAccountPassword();
      accountPassword && onSubmit(accountPassword);
    }
  };

  useEffect(() => {
    account.isBiometricsEnabled && tryFetchAccontPasswordFromBiometrics();
  }, [account.isBiometricsEnabled]);

  return (
    <View
      style={[styles.container, styles.theme.container, style]}
      onPress={onPress}
      testID={testID}
    >
      <View style={[styles.body]}>
        <Avatar address={account.metadata.address} size={45} style={styles.avatar} />

        <H3 style={[styles.nameText, styles.theme.nameText]}>{account.metadata.name}</H3>

        <P style={[styles.addressText, styles.theme.addressText]}>{account.metadata.address}</P>

        <Input
          placeholder={i18next.t('auth.form.passwordLabel')}
          autoCorrect={false}
          autoFocus
          placeholderTextColor={
            theme === themes.dark ? colors.dark.mountainMist : colors.light.blueGray
          }
          secureTextEntry
          onChange={setPassword}
          value={password}
          returnKeyType="done"
          testID="decrypt-password-input"
        />
      </View>

      <View style={[styles.footer]}>
        <PrimaryButton
          noTheme
          disabled={!password}
          onPress={() => onSubmit(password)}
          testID="decrypt-button-continue"
        >
          {i18next.t('commons.buttons.confirm')}
        </PrimaryButton>
      </View>
    </View>
  );
}
