import { themes, colors, boxes, fonts } from 'constants/styleGuide';
import { setColorOpacity } from 'utilities/helpers';

export default () => ({
  common: {
    container: {
      alignItems: 'center',
      padding: boxes.boxPadding,
      borderWidth: 1,
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
  },

  [themes.light]: {
    container: {
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
  },

  [themes.dark]: {
    container: {
      borderColor: setColorOpacity(colors.light.white, 0.15),
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
});