import { Dimensions, Platform } from 'react-native';
import { themes, colors, boxes } from '../../../constants/styleGuide';
import { viewportHeight, headerHeight } from '../../../utilities/device';

const { height, width } = Dimensions.get('window');
export default () => ({
  common: {
    innerContainer: {
      flexDirection: 'column',
      paddingBottom: 24,
    },
    titleContainer: {
      overflow: 'hidden',
      marginRight: boxes.boxPadding,
      marginLeft: boxes.boxPadding,
    },
    form: {
      paddingBottom: boxes.boxPadding,
    },
    input: {
      marginTop: 0,
      flexWrap: 'wrap',
      flex: 1,
    },
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
      paddingLeft: boxes.boxPadding,
      paddingRight: boxes.boxPadding,
      paddingTop: 24,
      paddingBottom: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    scanButton: {
      position: 'absolute',
      right: 10,
      zIndex: 99,
      top: 47,
      paddingRight: 15,
      paddingLeft: 10,
      paddingBottom: 10,
      width: 80,
      height: 30,
    },
    scanButtonTitle: {
      fontSize: 14,
      width: 39,
      paddingLeft: 5,
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
    addressContainer: {
      width: '100%',
    },
    addressInput: {
      ...Platform.select({
        android: {
          height: 48,
          // paddingTop: 10,
          // paddingBottom: 15,
          paddingLeft: 40,
        },
        ios: {
          height: 48,
          paddingLeft: 40,
        },
      }),
    },
    addressInputContainer: {
      ...Platform.select({
        android: {
          minHeight: 58,
        },
        ios: {
          minHeight: 48,
        },
      }),
    },
    avatar: {
      position: 'absolute',
      zIndex: 0,
      left: 20,
      top: 41,
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
  },
  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
    subtitle: {
      color: colors.light.gray2,
    },
    scanButtonTitle: {
      color: colors.light.blue,
    },
    permissionRequestWrapper: {
      backgroundColor: colors.light.gray6,
    },
    permissionDescription: {
      color: colors.light.gray2,
    },
  },
  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.screenBgNavy,
    },
    subtitle: {
      color: colors.dark.gray4,
    },
    scanButtonTitle: {
      color: colors.dark.blue,
    },
    permissionRequestWrapper: {
      backgroundColor: colors.dark.screenBgNavy,
    },
    permissionTitle: {
      color: colors.dark.white,
    },
    permissionDescription: {
      color: colors.dark.gray4,
    },
  },
});
