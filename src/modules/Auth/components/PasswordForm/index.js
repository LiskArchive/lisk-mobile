import React, { useState } from 'react';
import { View } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import Avatar from 'components/shared/avatar';
import Input from 'components/shared/toolBox/input';
import { P } from 'components/shared/toolBox/typography';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { colors, themes } from 'constants/styleGuide';
import useScreenshotPrevent from 'hooks/useScreenshotPrevent';

import getStyles from './styles';

export default function PasswordForm({ address, onPress, testID, theme, onSubmit }) {
  useScreenshotPrevent();
  const [password, setPassword] = useState('');

  const { styles } = useTheme({ styles: getStyles() });

  return (
    <View style={styles.container} onPress={onPress} testID={testID}>
      <View style={styles.content}>
        <Avatar address={address} size={45} style={styles.avatar} />
        <P style={[styles.address, styles.theme.address]}>{address}</P>

        <Input
          placeholder={i18next.t('auth.form.passwordLabel')}
          autoCorrect={false}
          autoFocus
          placeholderTextColor={
            theme === themes.dark ? colors.dark.mountainMist : colors.light.blueGray
          }
          onChange={setPassword}
          value={password}
          returnKeyType="done"
        />
      </View>

      <View style={[styles.footer]}>
        <PrimaryButton
          noTheme
          title={i18next.t('banners.btcRemoval.buttons.gotIt')}
          disabled={!password}
          onPress={() => onSubmit(password)}
        />
      </View>
    </View>
  );
}
