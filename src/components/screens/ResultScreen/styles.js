import { themes, colors, boxes, fonts } from 'constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      flex: 1,
    },
    container: {
      padding: boxes.boxPadding,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    illustration: {
      paddingVertical: 16,
    },
    title: {
      fontFamily: fonts.family.heading,
      fontSize: fonts.size.h3,
      padding: 4,
      textAlign: 'center',
    },
    description: {
      fontFamily: fonts.family.context,
      fontSize: fonts.size.base,
      textAlign: 'center',
      padding: 8,
    },
    continueButton: {
      paddingHorizontal: 20,
      margin: boxes.boxPadding,
    },
  },

  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
    title: {
      color: colors.light.zodiacBlue,
    },
    description: {
      color: colors.light.zodiacBlue,
    },
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.mainBg,
    },
    title: {
      color: colors.dark.ghost,
    },
    description: {
      color: colors.dark.ghost,
    },
  },
});
