import { themes, colors, boxes } from 'constants/styleGuide';

export function getCopyPassphraseStyles() {
  return {
    common: {
      container: {
        flex: 1,
      },
      body: {
        flex: 1,
        padding: boxes.boxPadding,
      },
      footer: {
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
      qrText: {
        textAlign: 'center',
      },
      button: {
        color: colors.light.ultramarineBlue,
        fontWeight: 'bold',
        paddingLeft: 5,
      },
    },

    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
      },
      text: {
        color: colors.light.blueGray,
      },
    },

    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
      },
      text: {
        color: colors.dark.ghost,
      },
    },
  };
}
