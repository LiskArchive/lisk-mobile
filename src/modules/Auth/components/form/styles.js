import { colors, fonts, themes } from 'constants/styleGuide';
import { deviceType } from 'utilities/device';

export default () => ({
  common: {
    container: {
      flex: 1,
    },
    input: {
      fontFamily: fonts.family.passphrase,
      textAlign: 'justify',
      color: colors.dark.whiteSmoke,
    },
    inputContainer: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    inputRevealed: {
      fontFamily: fonts.family.passphraseText,
    },
    passphraseRevealButton: {
      position: 'absolute',
      zIndex: 99,
      left: 165,
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
  [themes.light]: {
    input: {
      color: colors.dark.zodiacBlue,
    },
    label: {
      color: colors.dark.maastrichtBlue,
    },
    scanButtonTitle: {
      color: colors.dark.maastrichtBlue,
    },
  },
  [themes.dark]: {
    input: {
      color: colors.dark.whiteSmoke,
    },
    label: {
      color: colors.dark.whiteSmoke,
    },
    scanButtonTitle: {
      color: colors.dark.whiteSmoke,
    },
  },
});
