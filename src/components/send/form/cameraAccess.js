import React, { Fragment } from 'react';
import { View, Image, TouchableHighlight, Linking } from 'react-native';
import Icon from '../../toolBox/icon';
import styles from './styles';
import { P, H4 } from '../../toolBox/typography';
import { colors } from '../../../constants/styleGuide';
import cameraPermissionIcon from '../../../assets/images/cameraPermissionIcon.png';

const CameraAccess = ({ cameraStatus, galleryStatus, toggleGallery }) => (
  <Fragment>
    {
      (cameraStatus === 'READY') ?
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
            if (galleryStatus) {
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
      </View> :
      <TouchableHighlight
        onPress={() => { Linking.openURL('app-settings:'); }}
        underlayColor='transparent'
        style={styles.permissionRequestWrapper}>
        <Fragment>
          <Image
            style={styles.permissionIcon}
            source={cameraPermissionIcon} />
          <H4>Allow camera access</H4>
          <P style={styles.permissionDescription}>
            Lisk needs to access your camera for scanning QR codes.
            Tap on the icon above to go to settings.
          </P>
        </Fragment>
      </TouchableHighlight>
    }
  </Fragment>
);

export default CameraAccess;
