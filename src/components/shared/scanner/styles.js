import { themes, colors } from 'constants/styleGuide'
import {
  deviceHeight,
  deviceWidth,
  viewportHeight,
  headerHeight,
  deviceType,
} from 'utilities/device'

const height = deviceHeight()
const width = deviceWidth()
const headFullAndroid = viewportHeight() + headerHeight() + 20
const headerFullIOS = viewportHeight() + headerHeight()
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
      borderTopColor: 'rgba(57, 68, 81, 0.85)',
      borderTopWidth: deviceType() === 'iOSx' ? 34 : 10,
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
      height: 30,
      lineHeight: 30,
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
    headerContainer: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      flexDirection: 'row',
    },
    closeButton: {
      width: 50,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
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
})
