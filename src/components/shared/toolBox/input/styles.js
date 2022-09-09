import { themes, fonts, colors } from 'constants/styleGuide'

export default () => ({
  common: {
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rightAdornment: {
      position: 'absolute',
      right: 4,
      padding: 10,
    },
    leftAdornment: {
      position: 'absolute',
      left: 4,
      padding: 8,
    },
    secureTextEntryIcon: {
      position: 'absolute',
      right: 5,
      padding: 8,
    },
    inputLabel: {
      fontFamily: fonts.family.context,
      fontSize: fonts.size.input,
      marginBottom: 16,
    },
    input: {
      fontSize: fonts.size.base,
      width: '100%',
      borderWidth: 1,
      padding: 16,
      borderRadius: 10,
    },
    inputWithLeftAdornment: {
      paddingLeft: 40,
    },
    inputWithRightAdornment: {
      paddingRight: 40,
    },
    inputFocused: {
      borderColor: colors.light.ultramarineBlue,
    },
    errorMessageContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginTop: 8,
      marginBottom: 8,
    },
    errorMessage: {
      fontFamily: fonts.family.context,
      fontSize: fonts.size.input,
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
      color: colors.light.burntSieanna,
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
      color: colors.light.burntSieanna,
    },
  },
})
