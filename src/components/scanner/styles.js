import { Dimensions } from 'react-native';
import { themes, colors } from '../../constants/styleGuide';
import { viewportHeight, headerHeight } from '../../utilities/device';

const { height, width } = Dimensions.get('window');
export default () => ({
  common: {
    preview: {
      position: 'absolute',
      top: 0,
      left: 0,
      flex: 1,
      height,
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
      paddingTop: 24,
      paddingBottom: 24,
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
      backgroundColor: colors.light.blue,
    },
    galleryDisabled: {
      backgroundColor: colors.light.gray2,
    },
    galleryDescription: {
      color: colors.light.white,
      maxWidth: 230,
    },
    permissionRequestWrapper: {
      position: 'absolute',
      height: viewportHeight() + headerHeight(),
      width: '100%',
      top: 0,
      left: 0,
      backgroundColor: colors.light.gray6,
      zIndex: 10,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
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
      color: colors.light.gray2,
    },
    closeButton: {
      marginTop: 28,
      width: 100,
    },
  },
  [themes.light]: {
    permissionRequestWrapper: {
      backgroundColor: colors.light.gray6,
    },
    permissionDescription: {
      color: colors.light.gray2,
    },
    closeButton: {
      color: colors.light.white,
    },
  },
  [themes.dark]: {
    permissionRequestWrapper: {
      backgroundColor: colors.dark.screenBgNavy,
    },
    permissionTitle: {
      color: colors.dark.white,
    },
    permissionDescription: {
      color: colors.dark.gray4,
    },
    closeButton: {
      color: colors.dark.white,
    },
  },
});
