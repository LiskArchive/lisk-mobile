import { themes, boxes, colors, fonts } from 'constants/styleGuide';
import { setColorOpacity } from 'utilities/helpers';

export default {
  common: {
    container: {
      flex: 1,
    },
    title: {
      textAlign: 'center',
      marginBottom: 8,
      fontSize: fonts.size.h2,
    },
    description: {
      textAlign: 'center',
      color: setColorOpacity(colors.light.zodiacBlue, 0.7),
    },
    inputContainer: {
      paddingVertical: boxes.boxPadding,
    },
    errorMessage: {
      fontFamily: fonts.family.context,
      fontSize: fonts.size.input,
      marginTop: 8,
      textAlign: 'center',
    },
  },
  [themes.light]: {
    title: {
      color: colors.light.zodiacBlue,
    },
    description: {
      color: colors.light.zodiacBlue,
    },
    errorMessage: {
      color: colors.light.burntSieanna,
    },
  },

  [themes.dark]: {
    title: {
      color: colors.dark.white,
    },
    description: {
      color: colors.dark.white,
    },
    errorMessage: {
      color: colors.light.burntSieanna,
    },
  },
};
