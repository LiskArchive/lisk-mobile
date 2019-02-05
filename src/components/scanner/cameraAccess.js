import React, { Fragment } from 'react';
import { Image, TouchableHighlight } from 'react-native';
import OpenAppSettings from 'react-native-app-settings';
import { translate } from 'react-i18next';
import { P, H4 } from '../toolBox/typography';
import cameraPermissionIconLight from '../../assets/images/camera3xLight.png';
import cameraPermissionIconDark from '../../assets/images/camera3xDark.png';
import withTheme from '../withTheme';
import getStyles from './styles';
import { themes, colors } from '../../constants/styleGuide';
import { IconButton } from '../toolBox/button';

const CameraAccess = ({
  theme, styles, close, fullScreen, t,
}) => (
  <TouchableHighlight
    onPress={() => { OpenAppSettings.open(); }}
    underlayColor='transparent'
    style={[
      styles.permissionRequestWrapper,
      styles.theme.permissionRequestWrapper,
      fullScreen ? styles.fillScreen : null,
    ]}>
    <Fragment>
      {
        fullScreen ?
          <IconButton
            icon='back'
            title=''
            onPress={close}
            style={styles.cameraAccessCloseButton}
            titleStyle={styles.theme.closeButton}
            color={colors[theme].gray2}
          /> : null
      }
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
        {t('Allow camera access')}
      </H4>
      <P style={[styles.permissionDescription, styles.theme.permissionDescription]}>
        {t('Lisk needs to access your camera for scanning QR codes. Tap on the icon above to go to settings.')}
      </P>
    </Fragment>
  </TouchableHighlight>);

export default withTheme(translate()(CameraAccess), getStyles());
