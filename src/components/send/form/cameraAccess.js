import React, { Fragment } from 'react';
import { Image, TouchableHighlight, Linking } from 'react-native';
import styles from './styles';
import { P, H4 } from '../../toolBox/typography';
import cameraPermissionIcon from '../../../assets/images/cameraPermissionIcon.png';

const CameraAccess = () => (
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
);

export default CameraAccess;
