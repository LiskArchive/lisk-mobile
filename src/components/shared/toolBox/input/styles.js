import { themes, fonts, colors } from '../../../../constants/styleGuide';
import { setColorOpacity } from '../../../../utilities/helpers';

export default () => ({
  common: {
    inputContainer: {
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 20,
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
      backgroundColor: colors.light.burntSieanna,
    },
  },

  [themes.dark]: {
    inputLabel: {
      color: colors.dark.platinum,
    },
    input: {
      color: colors.dark.white,
      borderColor: setColorOpacity(colors.dark.white, 0.24),
    },
    inputErrorStyle: {
      borderColor: colors.dark.burntSieanna,
    },
    errorIcon: {
      color: colors.dark.burntSieanna,
    },
    errorMessage: {
      color: colors.dark.white,
      backgroundColor: colors.light.burntSieanna,
    },
  },
});
