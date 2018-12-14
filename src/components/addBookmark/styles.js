import { Dimensions, Platform } from 'react-native';
import { themes, colors, boxes, fonts } from '../../constants/styleGuide';
import { viewportHeight, headerHeight } from '../../utilities/device';

const { height, width } = Dimensions.get('window');
export default () => ({
  common: {
    wrapper: {
      flex: 1,
    },
    innerContainer: {
      flexDirection: 'column',
      flex: 1,
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
    address: {
      fontWeight: 'bold',
      marginLeft: 10,
    },
    staticAddressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    staticAvatar: {
      paddingBottom: 0,
    },
    row: {
      marginTop: 25,
      marginBottom: 5,
      marginRight: boxes.boxPadding,
      marginLeft: boxes.boxPadding,
    },
    label: {
      marginTop: 5,
      marginBottom: 7,
      color: colors.light.gray1,
      fontFamily: fonts.family.contextLight,
      fontSize: fonts.size.input,
      fontWeight: '400',
    },
  },
  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
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
    label: {
      color: colors.light.gray1,
    },
    address: {
      color: colors.light.black,
    },
  },
  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.screenBgNavy,
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
    label: {
      color: colors.dark.gray4,
    },
    address: {
      color: colors.dark.white,
    },
  },
});
