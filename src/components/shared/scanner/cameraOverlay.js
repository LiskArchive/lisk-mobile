import React from 'react';
import {
  View,
  // TouchableHighlight,
  // Platform,
} from 'react-native';
// import OpenAppSettings from 'react-native-app-settings';
import { translate } from 'react-i18next';
// import Icon from '../toolBox/icon';
import { colors } from 'constants/styleGuide';
import { IconButton } from '../toolBox/button';
import { P } from '../toolBox/typography';
import withTheme from '../withTheme';
import getStyles from './styles';

const CameraOverlay = ({ styles, safeArea, containerStyles, t, close, theme }) => (
  <View style={[styles.cameraOverlay, containerStyles]}>
    <View style={[styles.headerContainer, safeArea ? styles.safeArea : null]}>
      <IconButton
        icon="cross"
        onPress={close}
        style={styles.closeButton}
        titleStyle={styles.theme.closeButton}
        color={colors[theme].white}
      />
      <P style={styles.galleryDescription}>
        {/* {photoPermission === 'authorized'
          ? t('Scan a QR code or upload from your camera roll.')
          : t('Scan a QR code or grant access to the camera roll.')} */}
        {t('Scan a QR code.')}
      </P>
    </View>
  </View>
);

export default withTheme(translate()(CameraOverlay), getStyles());
