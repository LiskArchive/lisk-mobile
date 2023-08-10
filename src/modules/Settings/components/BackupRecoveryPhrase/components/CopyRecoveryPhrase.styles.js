import { themes, colors, boxes, fonts } from 'constants/styleGuide';
import { setColorOpacity } from 'utilities/helpers';

export function getCopyRecoveryPhraseStyles() {
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
      recoveryPhraseContainer: {
        alignItems: 'center',
        padding: boxes.boxPadding,
        borderWidth: 1,
        borderRadius: 8,
      },
      recoveryPhrase: {
        marginTop: 30,
        marginBottom: 30,
        fontFamily: fonts.family.recoveryPhraseText,
        fontSize: 18,
        lineHeight: 32,
        textAlign: 'center',
      },
      copyContainer: {
        alignItems: 'center',
      },
      copy: {
        fontFamily: fonts.family.contextBold,
      },
      recoveryPhraseTitle: {
        marginBottom: 24,
      },
    },

    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
      },
      recoveryPhraseContainer: {
        borderColor: colors.light.mystic,
      },
      recoveryPhraseTitle: {
        color: colors.light.blueGray,
      },
      recoveryPhrase: {
        color: colors.light.maastrichtBlue,
      },
      copy: {
        color: colors.light.ultramarineBlue,
      },
      text: {
        color: colors.light.blueGray,
      },
    },

    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
      },
      recoveryPhraseContainer: {
        borderColor: setColorOpacity(colors.light.white, 0.15),
      },
      text: {
        color: colors.dark.ghost,
      },
      recoveryPhraseTitle: {
        color: colors.dark.platinum,
      },
      recoveryPhrase: {
        color: colors.dark.white,
      },
      copy: {
        color: colors.dark.ultramarineBlue,
      },
    },
  };
}
