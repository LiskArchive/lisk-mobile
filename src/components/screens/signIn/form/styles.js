import { colors, fonts, themes } from '../../../../constants/styleGuide';
import { deviceHeight, deviceType } from '../../../../utilities/device';

const height = deviceHeight();
const isSmallDevice = height <= 640;

export default () => ({
  common: {
    container: {
      height: '100%',
      paddingTop: isSmallDevice ? 100 : 130,
    },
    containerSimplified: {
      height: '100%',
      paddingTop: isSmallDevice ? 50 : 100,
    },
    paddingBottom: {
      paddingBottom: isSmallDevice ? 0 : 40,
    },
    input: {
      fontFamily: fonts.family.passphrase,
      textAlign: 'justify',
    },
    inputRevealed: {
      fontFamily: fonts.family.passphraseText,
    },
    passphraseRevealButton: {
      position: 'absolute',
      zIndex: 99,
      left: 85,
      top: 15,
    },
    scanButton: {
      position: 'absolute',
      right: 21,
      zIndex: 99,
      top: 15,
      paddingLeft: 10,
      width: 67,
      height: 30,
    },
    scanButtonTitle: {
      fontSize: fonts.size.small,
      color: colors.light.maastrichtBlue,
      paddingLeft: 6,
    },
    longTitle: {
      width: 87,
    },
    cameraRoll: {
      borderTopColor: colors.light.white,
      borderTopWidth: deviceType() === 'iOSx' ? 74 : 50,
    },
    cameraOverlay: {
      borderTopColor: 'rgba(57, 68, 81, 0.85)',
      borderTopWidth: deviceType() === 'iOSx' ? 34 : 10,
    },
    backButton: {
      position: 'absolute',
      width: 130,
      height: 32,
      left: 3,
      top: deviceType() === 'iOSx' ? 48 : 24,
    },
    backButtonTitle: {
      color: colors.light.ultramarineBlue,
    },
    createAccountWrapper: {
      marginBottom: deviceType() === 'iOSx' ? 35 : 10,
    },
  },
  [themes.dark]: {
    input: {
      color: colors.dark.whiteSmoke
    }
  }
});
