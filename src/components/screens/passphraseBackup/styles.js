import { themes, colors, boxes } from '../../../constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      flex: 1,
    },
    container: {
      flex: 1,
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
    QRText: {
      marginTop: 26,
      marginBottom: 8,
      textAlign: 'center',
    },
    button: {
      color: colors.light.ultramarineBlue,
      fontWeight: 'bold',
    },
  },

  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
    text: {
      color: colors.light.blueGray,
    },
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.mainBg,
    },
    text: {
      color: colors.dark.ghost,
    },
  },
});
