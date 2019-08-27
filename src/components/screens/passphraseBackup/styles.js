import { themes, colors, boxes } from '../../../constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      flex: 1,
    },
    container: {
      alignItems: 'center',
      paddingHorizontal: boxes.boxPadding,
      paddingVertical: 2 * boxes.boxPadding,
    },
    qrCodeContainer: {
      marginTop: boxes.boxPadding,
      alignItems: 'center',
    },
    text: {
      marginBottom: 28,
    },
  },

  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
    text: {
      color: colors.dark.blueGray,
    },
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.maastrichtBlue,
    },
    text: {
      color: colors.dark.ghost,
    },
  },
});
