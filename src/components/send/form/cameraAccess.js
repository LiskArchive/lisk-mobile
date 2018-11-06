import React, { Fragment } from 'react';
import { Image, TouchableHighlight } from 'react-native';
import OpenAppSettings from 'react-native-app-settings';
import { P, H4 } from '../../toolBox/typography';
import cameraPermissionIcon from '../../../assets/images/camera3x.png';
import withTheme from '../../withTheme';
import getStyles from './styles';

const CameraAccess = ({ styles }) => (
  <TouchableHighlight
    onPress={() => { OpenAppSettings.open(); }}
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
  </TouchableHighlight>);

export default withTheme(CameraAccess, getStyles());
