import { themes, colors } from 'constants/styleGuide';
import {
  deviceHeight,
  deviceWidth,
  viewportHeight,
  headerHeight,
  deviceType,
} from 'utilities/device';

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
      flexDirection: 'row',
      alignItems: 'center',
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
      flex: 1,
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
      paddingLeft: 0,
    },
    scannerContainer: {
      flex: 1,
      zIndex: 1000,
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
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
      backgroundColor: colors.dark.mainBg,
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
