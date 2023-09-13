import { useEffect } from 'react';
import { Alert } from 'react-native';
import OpenAppSettings from 'react-native-app-settings';
import i18next from 'i18next';

export default function CameraAccessAlert({ type, close }) {
  const handleOpenSettingsPress = () => OpenAppSettings.open();

  useEffect(() => {
    if (type === 'noAuth') {
      Alert.alert(
        i18next.t('scanner.cameraAccessTitle'),
        i18next.t('scanner.cameraAccessDescription'),
        [
          {
            text: i18next.t('commons.buttons.cancel'),
            onPress: close,
            style: 'cancel',
          },
          { text: i18next.t('settings.title'), onPress: handleOpenSettingsPress },
        ]
      );
    }
  }, [close, type]);

  return null;
}
