import React, { useState } from 'react';
import { View } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import Avatar from 'components/shared/avatar';
import Input from 'components/shared/toolBox/input';
import { H3, P } from 'components/shared/toolBox/typography';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { colors, themes } from 'constants/styleGuide';
import useScreenshotPrevent from 'hooks/useScreenshotPrevent';

import getStyles from './styles';

export default function PasswordForm({ account, onPress, testID, theme, onSubmit }) {
  useScreenshotPrevent();
  const [password, setPassword] = useState('');

  const { styles } = useTheme({ styles: getStyles() });

  return (
    <View style={[styles.container, styles.theme.container]} onPress={onPress} testID={testID}>
      <View style={styles.body}>
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
          {i18next.t('commons.buttons.continue')}
        </PrimaryButton>
      </View>
    </View>
  );
}
