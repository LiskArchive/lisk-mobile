import { themes, fonts, colors, boxes } from 'constants/styleGuide'

export default () => ({
  common: {
    button: {
      fontSize: fonts.size.base,
      fontFamily: fonts.family.context,
      textAlign: 'center',
    },
    iconButton: {
      minWidth: 40,
      height: 30,
      paddingLeft: boxes.elementPadding,
      flexDirection: 'row',
      alignSelf: 'flex-start',
      alignItems: 'center',
    },
    iconButtonTitle: {
      color: colors.light.ultramarineBlue,
      lineHeight: 18,
    },
    labelButton: {
      backgroundColor: 'transparent',
      color: colors.light.ultramarineBlue,
      fontSize: fonts.size.base,
      borderWidth: 2,
      borderColor: 'transparent',
      fontFamily: fonts.family.context,
    },
    buttonContainer: {
      borderColor: colors.light.ghost,
      borderWidth: 1,
      borderRadius: 2,
    },
    buttonText: {
      color: colors.light.maastrichtBlue,
      lineHeight: boxes.buttonHeight,
      fontFamily: fonts.family.contextSemiBold,
      fontSize: fonts.size.base,
      textAlign: 'center',
    },
    primaryButtonContainer: {
      borderColor: 'transparent',
      backgroundColor: colors.light.ultramarineBlue,
    },
    primaryButtonText: {
      color: colors.light.white,
    },
    disabledButtonContainer: {
      opacity: 0.75,
    },
  },

  [themes.light]: {},

  [themes.dark]: {
    primaryButtonContainer: {},
    primaryButtonText: {},
  },
})
