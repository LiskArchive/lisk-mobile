import { themes, colors, boxes } from 'constants/styleGuide';

export default () => ({
  common: {
    container: {
      flex: 1,
    },
    body: {
      flex: 1,
      paddingTop: boxes.boxPadding,
      paddingLeft: boxes.boxPadding,
      paddingRight: boxes.boxPadding,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatar: {
      marginBottom: 16,
    },
    nameText: {
      fontWeight: '500',
      fontSize: 16,
      marginBottom: 8,
    },
    addressText: {
      fontSize: 14,
      marginBottom: 24,
    },
    footer: {
      padding: boxes.boxPadding,
    },
  },

  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
    },
    nameText: {
      color: colors.light.zodiacBlue,
    },
    addressText: {
      color: colors.light.blueGray,
    },
  },

  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.mainBg,
    },
    nameText: {
      color: colors.dark.white,
    },
    addressText: {
      color: colors.dark.whiteSmoke,
    },
  },
});
