import { themes, colors, boxes, fonts } from '../../../constants/styleGuide';
import { setColorOpacity } from '../../../utilities/helpers';

export default () => ({
  common: {
    wrapper: {
      alignItems: 'center',
      padding: boxes.boxPadding,
      borderWidth: 1,
    },
    passphrase: {
      marginTop: 30,
      marginBottom: 30,
      fontFamily: fonts.family.passphraseText,
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
    wrapper: {
      borderColor: colors.light.mystic,
    },
    passphraseTitle: {
      color: colors.light.blueGray,
    },
    passphrase: {
      color: colors.light.maastrichtBlue,
    },
    copy: {
      color: colors.light.ultramarineBlue,
    },
  },

  [themes.dark]: {
    wrapper: {
      borderColor: setColorOpacity(colors.light.white, 0.15),
    },
    passphraseTitle: {
      color: colors.dark.platinum,
    },
    passphrase: {
      color: colors.dark.white,
    },
    copy: {
      color: colors.dark.ultramarineBlue,
    },
  },
});
