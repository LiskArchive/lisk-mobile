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
      marginBottom: 14,
    },
    actionButton: {
      width: '100%',
      marginBottom: boxes.boxPadding,
      marginRight: boxes.boxPadding,
      marginLeft: boxes.boxPadding,
    },
    secondaryButton: {
      color: colors.light.slateGray,
      fontSize: 16,
    },
  },

  [themes.light]: {
    text: {
      color: colors.light.slateGray,
    },
  },

  [themes.dark]: {
    text: {
      color: colors.dark.slateGray,
    },
  },
});
