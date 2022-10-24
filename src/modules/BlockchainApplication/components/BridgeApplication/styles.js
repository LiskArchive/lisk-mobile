import { themes, boxes, colors } from 'constants/styleGuide';
import { setColorOpacity } from 'utilities/helpers';

export default {
  common: {
    container: {
      flex: 1,
      paddingTop: boxes.boxPadding,
      paddingBottom: boxes.boxPadding,
    },
    title: {
      textAlign: 'center',
      marginBottom: 8,
    },
    description: {
      textAlign: 'center',
      color: setColorOpacity(colors.light.zodiacBlue, 0.7),
    },
    inputContainer: {
      paddingVertical: boxes.boxPadding,
    },
  },
  [themes.light]: {
    title: {
      color: colors.light.zodiacBlue,
    },
    description: {
      color: colors.light.zodiacBlue,
    },
  },

  [themes.dark]: {
    title: {
      color: colors.dark.white,
    },
    description: {
      color: colors.dark.white,
    },
  },
};
