import { themes, colors, boxes } from '../../../../constants/styleGuide';

export default () => ({
  common: {
    headerContainer: {
      margin: boxes.boxPadding,
    },
  },

  [themes.light]: {
    subHeader: {
      color: colors.light.gray2,
    },
  },

  [themes.dark]: {
    subHeader: {
      color: colors.dark.gray4,
    },
  },
});
