import React, { Fragment } from 'react';
import { Image, TouchableHighlight } from 'react-native';
import OpenAppSettings from 'react-native-app-settings';
import { P, H4 } from '../toolBox/typography';
import cameraPermissionIconLight from '../../assets/images/camera3xLight.png';
import cameraPermissionIconDark from '../../assets/images/camera3xDark.png';
import withTheme from '../withTheme';
import getStyles from './styles';
import { themes } from '../../constants/styleGuide';

const CameraAccess = ({ theme, styles }) => (
  <TouchableHighlight
    onPress={() => { OpenAppSettings.open(); }}
    underlayColor='transparent'
    style={[styles.permissionRequestWrapper, styles.theme.permissionRequestWrapper]}>
    <Fragment>
      {
        theme === themes.light ?
          <Image
            style={styles.permissionIcon}
            source={cameraPermissionIconLight} /> :
          <Image
            style={styles.permissionIcon}
            source={cameraPermissionIconDark} />
      }
      <H4 style={[styles.permissionTitle, styles.theme.permissionTitle]}>
        Allow camera access
      </H4>
      <P style={[styles.permissionDescription, styles.theme.permissionDescription]}>
        Lisk needs to access your camera for scanning QR codes.
        Tap on the icon above to go to settings.
      </P>
    </Fragment>
  </TouchableHighlight>);

export default withTheme(CameraAccess, getStyles());
