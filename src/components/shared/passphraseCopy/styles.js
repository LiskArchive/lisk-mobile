import { themes, colors, boxes, fonts } from '../../../constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      alignItems: 'center',
      padding: boxes.boxPadding,
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
      borderWidth: 1,
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
