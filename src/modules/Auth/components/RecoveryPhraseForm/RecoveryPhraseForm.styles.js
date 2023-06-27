import { colors, fonts, themes } from 'constants/styleGuide';
import { deviceType } from 'utilities/device';

export default () => ({
  common: {
    container: {
      flex: 1,
    },
    input: {
      color: colors.dark.whiteSmoke,
      paddingTop: 15,
      fontFamily: fonts.family.recoveryPhraseText,
      fontWeight: '700',
      lineHeight: 20,
    },
    inputContainer: {
      paddingLeft: 0,
      paddingRight: 0,
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
    labelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 16,
      marginBottom: 8,
    },
    label: {
      fontFamily: fonts.family.context,
      fontSize: fonts.size.input,
    },
    item: {
      paddingBottom: 16,
    },
    derivationPathContainer: {
      marginBottom: 12,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    spaceBetween: {
      justifyContent: 'space-between',
    },
    info: {
      marginLeft: 8,
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
