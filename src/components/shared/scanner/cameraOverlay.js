import React from 'react';
import { View, TouchableHighlight, Platform } from 'react-native';
import OpenAppSettings from 'react-native-app-settings';
import { translate } from 'react-i18next';
import Icon from '../toolBox/icon';
import { P } from '../toolBox/typography';
import { colors } from '../../../constants/styleGuide';
import withTheme from '../../shared/withTheme';
import getStyles from './styles';

const CameraOverlay = ({
  styles,
  photoPermission,
  toggleGallery,
  containerStyles,
  t,
}) => (
  <View style={[styles.cameraOverlay, containerStyles]}>
    <P style={styles.galleryDescription}>
      {photoPermission === 'authorized'
        ? t('Scan a QR code or upload from your camera roll.')
        : t('Scan a QR code or grant access to the camera roll.')}
    </P>
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => {
        if (
          photoPermission === 'authorized' ||
          (photoPermission === 'undetermined' && Platform.OS === 'ios')
        ) {
          toggleGallery();
        } else {
          OpenAppSettings.open();
        }
      }}
      style={[
        styles.galleryButton,
        photoPermission ? styles.galleryEnabled : styles.galleryDisabled,
      ]}
    >
      <Icon size={18} color={colors.light.white} name="gallery" />
    </TouchableHighlight>
  </View>
);

export default withTheme(translate()(CameraOverlay), getStyles());
