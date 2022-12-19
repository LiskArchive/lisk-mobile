import { colors, themes, boxes } from 'constants/styleGuide';

export default () => ({
  common: {
    container: {
      flex: 1,
    },
    body: {
      flex: 1,
      paddingLeft: boxes.boxPadding,
      paddingRight: boxes.boxPadding,
    },
    title: {
      textAlign: 'center',
      marginTop: 24,
      marginBottom: 8,
    },
    footer: {
      padding: boxes.boxPadding,
    },
  },
  [themes.light]: {
    container: {
      backgroundColor: colors.dark.white,
    },
    title: {
      color: colors.light.zodiacBlue,
    },
  },
  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.black,
    },
    title: {
      color: colors.dark.white,
    },
  },
});
