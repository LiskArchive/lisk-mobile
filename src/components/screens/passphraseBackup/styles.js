import { themes, colors, boxes } from 'constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      flex: 1,
    },
    container: {
      padding: boxes.boxPadding,
    },
    qrCodeContainer: {
      marginTop: boxes.boxPadding,
      alignItems: 'center',
      paddingBottom: 60,
    },
    text: {
      marginBottom: 28,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 26,
      marginBottom: 8,
    },
    QRText: {
      textAlign: 'center',
    },
    button: {
      color: colors.light.ultramarineBlue,
      fontWeight: 'bold',
      paddingLeft: 5,
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
