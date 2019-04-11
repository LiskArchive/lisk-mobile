import { themes, colors, boxes } from '../../../constants/styleGuide';

export default () => ({
  common: {
    container: {
      alignItems: 'center',
      paddingBottom: boxes.boxPadding,
    },
    text: {
      textAlign: 'center',
      lineHeight: 22,
    },
    actionButton: {
      width: '100%',
      margin: boxes.boxPadding,
    },
  },

  [themes.light]: {
    text: {
      color: colors.light.gray2,
    },
    cancelButton: {
      color: colors.light.gray2,
    },
  },

  [themes.dark]: {
    text: {
      color: colors.dark.gray2,
    },
    cancelButton: {
      color: colors.dark.gray2,
    },
  },
});
