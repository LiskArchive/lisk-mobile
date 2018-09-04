import React from 'react';
import { View, TouchableHighlight, Linking } from 'react-native';
import Icon from '../../toolBox/icon';
import styles from './styles';
import { P } from '../../toolBox/typography';
import { colors } from '../../../constants/styleGuide';

const CameraOverlay = ({ galleryStatus, toggleGallery }) => (
  <View style={styles.cameraOverlay}>
    <P style={styles.galleryDescription}>
      {
        galleryStatus ?
        'Scan a QR code or upload from your camera roll.' :
        'Scan a QR code or grant access to the camera roll.'
      }
    </P>
    <TouchableHighlight
      underlayColor='transparent'
      onPress={() => {
        if (galleryStatus !== 'denied') {
          toggleGallery();
        } else {
          Linking.openURL('app-settings:');
        }
      }}
      style={[
        styles.galleryButton,
        galleryStatus ? styles.galleryEnabled : styles.galleryDisabled,
        ]}>
      <Icon size={18} color={colors.white} name='gallery' />
    </TouchableHighlight>
  </View>
);

export default CameraOverlay;
