import { themes, fonts, colors, boxes } from '../../../constants/styleGuide';

export default () => ({
  common: {
    button: {
      fontSize: fonts.size.base,
      fontFamily: fonts.family.context,
      textAlign: 'center',
    },
    primaryButton: {
      color: colors.light.white,
      lineHeight: boxes.buttonHeight,
    },
    buttonWrapper: {
      borderRadius: 3,
      borderWidth: 1,
      borderColor: 'transparent',
    },
    iconButton: {
      width: 40,
      height: 30,
      paddingLeft: boxes.elementPadding,
      flexDirection: 'row',
      alignSelf: 'flex-start',
      alignItems: 'center',
    },
    iconButtonTitle: {
      color: colors.light.actionBlue,
      lineHeight: 18,
    },
    disabledButtonBg: {
      borderWidth: 1,
    },
    labelButton: {
      backgroundColor: 'transparent',
      color: colors.light.actionBlueAccent,
      fontSize: fonts.size.base,
      borderWidth: 2,
      borderColor: colors.light.actionBlueAccent,
      fontFamily: fonts.family.context,
    },
  },

  [themes.light]: {
    disabledButtonColor: {
      color: colors.light.gray4,
    },
    disabledButtonBg: {
      backgroundColor: colors.light.white,
      borderColor: colors.light.gray4,
    },
  },

  [themes.dark]: {
    disabledButtonColor: {
      color: colors.dark.gray4,
    },
    disabledButtonBg: {
      backgroundColor: colors.dark.screenBgNavy,
      borderColor: colors.dark.gray4,
    },
  },
});
