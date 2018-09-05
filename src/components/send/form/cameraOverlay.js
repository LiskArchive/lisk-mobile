import React from 'react';
import { View, TouchableHighlight, Platform } from 'react-native';
import OpenAppSettings from 'react-native-app-settings';
import Icon from '../../toolBox/icon';
import styles from './styles';
import { P } from '../../toolBox/typography';
import { colors } from '../../../constants/styleGuide';

const CameraOverlay = ({ photoPermission, toggleGallery }) => (
  <View style={styles.cameraOverlay}>
    <P style={styles.galleryDescription}>
      {
        photoPermission === 'authorized' ?
        'Scan a QR code or upload from your camera roll.' :
        'Scan a QR code or grant access to the camera roll.'
      }
    </P>
    <TouchableHighlight
      underlayColor='transparent'
      onPress={() => {
        if (photoPermission === 'authorized' ||
          (photoPermission === 'undetermined' && Platform.OS === 'ios')) {
          toggleGallery();
        } else {
          OpenAppSettings.open();
        }
      }}
      style={[
        styles.galleryButton,
        photoPermission ? styles.galleryEnabled : styles.galleryDisabled,
        ]}>
      <Icon size={18} color={colors.white} name='gallery' />
    </TouchableHighlight>
  </View>
);

export default CameraOverlay;
