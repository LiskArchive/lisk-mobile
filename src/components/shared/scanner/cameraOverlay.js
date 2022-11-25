import React from 'react';
import // TouchableHighlight,
// Platform,
'react-native';
// import OpenAppSettings from 'react-native-app-settings';
import { translate } from 'react-i18next';
// import Icon from '../toolBox/icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from 'constants/styleGuide';
import { IconButton } from '../toolBox/button';
import { P } from '../toolBox/typography';
import withTheme from '../withTheme';
import getStyles from './styles';

const CameraOverlay = ({ styles, t, close, theme }) => (
  <SafeAreaView style={[styles.cameraOverlay]}>
    <IconButton
      icon="cross"
      onPress={close}
      style={styles.closeButton}
      titleStyle={styles.theme.closeButton}
      color={colors[theme].white}
    />
    <P style={[styles.galleryDescription]}>
      {/* {photoPermission === 'authorized'
        ? t('Scan a QR code or upload from your camera roll.')
        : t('Scan a QR code or grant access to the camera roll.')} */}
      {t('Scan a QR code.')}
    </P>
  </SafeAreaView>
);

export default withTheme(translate()(CameraOverlay), getStyles());
