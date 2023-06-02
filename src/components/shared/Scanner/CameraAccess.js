import React from 'react';
import { TouchableHighlight } from 'react-native';
import OpenAppSettings from 'react-native-app-settings';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { colors } from 'constants/styleGuide';
import { IconButton } from '../toolBox/button';
import { P, H4 } from '../toolBox/typography';

import getStyles from './Scanner.styles';

export default function CameraAccess({ close, fullScreen }) {
  const { styles } = useTheme({ styles: getStyles() });

  return (
    <TouchableHighlight
      onPress={() => {
        OpenAppSettings.open();
      }}
      underlayColor="transparent"
      style={[
        styles.permissionRequestWrapper,
        styles.theme.permissionRequestWrapper,
        fullScreen && styles.fillScreen,
      ]}
    >
      <>
        {fullScreen && (
          <IconButton
            icon="back"
            title=""
            onPress={close}
            titleStyle={styles.theme.closeButton}
            color={colors.light.blueGray}
          />
        )}

        <H4 style={[styles.permissionTitle, styles.theme.permissionTitle]}>
          {i18next.t('scanner.cameraAccessTitle')}
        </H4>

        <P style={[styles.permissionDescription, styles.theme.permissionDescription]}>
          {i18next.t('scanner.cameraAccessDescription')}
        </P>
      </>
    </TouchableHighlight>
  );
}
