/* eslint-disable max-statements */
import React from 'react';
import { Image, NativeModules, View } from 'react-native';
import AppLogo from 'assets/images/security/app.png';
import { Button } from 'components/shared/toolBox/button';
import { P, H2 } from 'components/shared/toolBox/typography';
import i18next from 'i18next';
import { useTheme } from 'contexts/ThemeContext';

const { UninstallModule } = NativeModules;

import getStyles from './styles';

export default function HarmfulAppDetails({ packageName }) {
  const { styles } = useTheme({ styles: getStyles() });

  const promptToUninstallApp = () => {
    UninstallModule.promptUninstall(packageName);
  };

  return (
    <View>
      <View style={styles.row}>
        <View style={styles.row}>
          <Image source={AppLogo} style={styles.appLogo} />
          <H2 style={[styles.packageName, styles.theme.text]}>{packageName}</H2>
        </View>
        <P style={[styles.description, styles.theme.text]}>
          {i18next.t('settings.scanDevice.details', { packageName })}
        </P>
      </View>
      <Button onPress={promptToUninstallApp} style={styles.buttonContainer} title="Uninstall" />
    </View>
  );
}
