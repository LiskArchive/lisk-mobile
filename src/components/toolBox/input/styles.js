import { themes, fonts, colors } from '../../../constants/styleGuide';

export default () => ({
  common: {
    inputContainer: {
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 20,
    },
    inputLabel: {
      color: colors.light.maastrichtBlue,
      fontFamily: fonts.family.context,
      fontSize: fonts.size.input,
      marginBottom: 10,
    },
    input: {
      color: colors.light.maastrichtBlue,
      fontSize: fonts.size.base,
      fontFamily: fonts.family.contextBold,
      width: '100%',
      borderColor: colors.light.platinum,
      borderWidth: 1,
      paddingTop: 13,
      padding: 13,
      borderRadius: 2,
    },
    inputFocused: {
      borderColor: colors.light.ultramarineBlue,
    },
    inputErrorStyle: {
      borderColor: colors.light.red,
    },
    errorMessageContainer: {
      marginTop: 10,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    errorIcon: {
      color: colors.light.red,
    },
    errorMessage: {
      color: colors.light.gray1,
      fontFamily: fonts.family.context,
      marginBottom: 20,
      paddingTop: 0,
      marginLeft: 5,
      marginRight: 0,
      marginTop: 0,
      fontSize: fonts.size.input,
    },
  },

  [themes.light]: {
  },

  [themes.dark]: {
    inputLabel: {
      color: colors.dark.gray4,
    },
    input: {
      color: colors.dark.white,
      borderColor: colors.dark.inputBorder,
    },
    inputErrorStyle: {
      borderColor: colors.dark.red,
    },
    errorIcon: {
      color: colors.dark.red,
    },
    errorMessage: {
      color: colors.dark.gray4,
    },
  },
});
