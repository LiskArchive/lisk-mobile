import { colors, fonts } from 'constants/styleGuide';
import { deviceHeight, deviceWidth, deviceType } from 'utilities/device';

const height = deviceHeight();
const width = deviceWidth();

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
    bottomContent: {
      alignItems: 'center',
    },
    galleryText: {
      color: colors.light.white,
      fontSize: fonts.size.base,
      marginVertical: 10,
      textAlign: 'center',
    },
    overlay: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerContainer: {
      paddingLeft: 20,
      paddingRight: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    galleryButton: {
      backgroundColor: colors.light.inkBlue,
      borderRadius: 35,
      height: 70,
      width: 70,
      bottom: 0,
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
});
