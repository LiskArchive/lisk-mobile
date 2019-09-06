import { themes, colors } from '../../../constants/styleGuide';
import {
  deviceHeight,
  deviceWidth,
  viewportHeight,
  headerHeight,
  deviceType,
} from '../../../utilities/device';

let buttonMarginTop = 0;
if (deviceType() === 'iOS') buttonMarginTop = 18;
if (deviceType() === 'iOSx') buttonMarginTop = 30;

const height = deviceHeight();
const width = deviceWidth();
const headFullAndroid = viewportHeight() + headerHeight() + 20;
const headerFullIOS = viewportHeight() + headerHeight();
export default () => ({
  common: {
    preview: {
      position: 'absolute',
      top: 0,
      left: 0,
      flex: 1,
      height: deviceType() === 'android' ? height + 20 : height,
      width,
    },
    cameraPreview: {
      zIndex: 99,
    },
    photoPreview: {
      zIndex: 100,
    },
    cameraOverlay: {
      backgroundColor: '#394451',
      opacity: 0.85,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 14,
      paddingBottom: 14,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    galleryButton: {
      borderRadius: 4,
      height: 48,
      width: 48,
      alignItems: 'center',
      justifyContent: 'center',
    },
    galleryEnabled: {
      backgroundColor: colors.light.ultramarineBlue,
    },
    galleryDisabled: {
      backgroundColor: colors.light.slateGray,
    },
    galleryDescription: {
      color: colors.light.white,
      maxWidth: 230,
    },
    permissionRequestWrapper: {
      position: 'absolute',
      height: deviceType() === 'android' ? headFullAndroid : headerFullIOS,
      width: '100%',
      top: 0,
      left: 0,
      backgroundColor: colors.light.whiteSmoke,
      zIndex: 10,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    fillScreen: {
      height,
    },
    permissionIcon: {
      width: 80,
      height: 80,
      marginBottom: 20,
    },
    permissionDescription: {
      marginTop: 2,
      maxWidth: '80%',
      textAlign: 'center',
      color: colors.light.slateGray,
    },
    closeButton: {
      marginTop: buttonMarginTop,
      width: 80,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingLeft: 0,
    },
    cameraAccessCloseButton: {
      position: 'absolute',
      zIndex: 2,
      left: 0,
      top: deviceType() === 'iOSx' ? 40 : 30,
    },
  },
  [themes.light]: {
    permissionRequestWrapper: {
      backgroundColor: colors.light.whiteSmoke,
    },
    permissionDescription: {
      color: colors.light.slateGray,
    },
    closeButton: {
      color: colors.light.white,
    },
  },
  [themes.dark]: {
    permissionRequestWrapper: {
      backgroundColor: colors.dark.maastrichtBlue,
    },
    permissionTitle: {
      color: colors.dark.white,
    },
    permissionDescription: {
      color: colors.dark.platinum,
    },
    closeButton: {
      color: colors.dark.white,
    },
  },
});
