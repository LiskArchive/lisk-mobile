import { themes, colors, fonts } from 'constants/styleGuide';

export default () => ({
  common: {
    container: {
      flex: 1,
    },
    title: {
      fontFamily: fonts.family.heading,
      fontSize: fonts.size.h3,
      marginBottom: 16,
      textAlign: 'center',
    },
    description: {
      fontFamily: fonts.family.context,
      fontSize: fonts.size.base,
      textAlign: 'center',
      marginBottom: 16,
    },
    button: {
      width: '100%',
      marginTop: 8,
    },
  },

  [themes.light]: {
    title: {
      color: colors.light.zodiacBlue,
    },
    description: {
      color: colors.light.zodiacBlue,
    },
    submitButton: {
      backgroundColor: colors.light.furyRed,
      borderColor: colors.light.furyRed,
    },
    buttonText: {
      color: colors.light.white,
    },
  },

  [themes.dark]: {
    title: {
      color: colors.dark.white,
    },
    description: {
      color: colors.dark.ghost,
    },
    submitButton: {
      backgroundColor: colors.dark.furyRed,
      borderColor: colors.dark.furyRed,
    },
  },
});
