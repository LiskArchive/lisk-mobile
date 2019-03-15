import { themes, fonts, colors } from '../../../constants/styleGuide';

export default () => ({
  common: {
    inputContainer: {
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 20,
    },
    inputLabel: {
      color: colors.light.gray1,
      fontFamily: fonts.family.contextLight,
      fontSize: fonts.size.input,
      fontWeight: '400',
    },
    input: {
      fontWeight: 'bold',
      color: colors.light.black,
      fontSize: fonts.size.input,
      fontFamily: fonts.family.contextSemiBold,
      minHeight: 30,
      width: '100%',
      borderBottomColor: colors.light.inputBorder,
      paddingBottom: 5,
      borderBottomWidth: 1,
      paddingTop: 5,
    },
    inputErrorStyle: {
      borderBottomColor: colors.light.red,
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
      borderBottomColor: colors.dark.inputBorder,
    },
    inputErrorStyle: {
      borderBottomColor: colors.dark.red,
    },
    errorIcon: {
      color: colors.dark.red,
    },
    errorMessage: {
      color: colors.dark.gray4,
    },
  },
});
