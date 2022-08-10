import { themes, fonts, colors } from 'constants/styleGuide';

export default () => ({
  common: {
    inputContainer: {
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 20,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    rightAdornment: {
      position: 'absolute',
      right: 5,
      padding: 10,
    },
    leftAdornment: {
      position: 'absolute',
      left: 5,
      padding: 10,
    },
    secureTextEntryIcon: {
      position: 'absolute',
      right: 5,
      padding: 10,
    },
    inputLabel: {
      fontFamily: fonts.family.context,
      fontSize: fonts.size.input,
      marginBottom: 13,
    },
    input: {
      fontSize: fonts.size.base,
      fontFamily: fonts.family.contextBold,
      width: '100%',
      borderWidth: 1,
      paddingTop: 11.5,
      padding: 13,
      borderRadius: 2,
    },
    inputFocused: {
      borderColor: colors.light.ultramarineBlue,
    },
    errorMessageContainer: {
      marginTop: 10,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    errorMessage: {
      fontFamily: fonts.family.context,
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      fontSize: fonts.size.input,
      backgroundColor: colors.light.burntSieanna,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
  },

  [themes.light]: {
    inputLabel: {
      color: colors.light.maastrichtBlue,
    },
    input: {
      color: colors.light.maastrichtBlue,
      borderColor: colors.light.platinum,
    },
    inputErrorStyle: {
      borderColor: colors.light.burntSieanna,
    },
    errorIcon: {
      color: colors.light.burntSieanna,
    },
    errorMessage: {
      color: colors.light.white,
    },
  },

  [themes.dark]: {
    inputLabel: {
      color: colors.dark.platinum,
    },
    input: {
      backgroundColor: colors.dark.textInputBg,
      color: colors.dark.white,
      borderColor: colors.dark.mainBg,
    },
    inputErrorStyle: {
      borderColor: colors.dark.burntSieanna,
    },
    errorIcon: {
      color: colors.dark.burntSieanna,
    },
    errorMessage: {
      color: colors.dark.white,
    },
  },
});
