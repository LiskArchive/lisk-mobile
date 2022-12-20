import { themes, colors, boxes } from 'constants/styleGuide';

export default () => ({
  common: {
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      paddingTop: boxes.boxPadding,
      paddingLeft: boxes.boxPadding,
      paddingRight: boxes.boxPadding,
      alignItems: 'center',
    },
    avatar: {
      marginBottom: 8,
    },
    address: {
      fontSize: 14,
      marginBottom: 8,
    },
    footer: {
      padding: boxes.boxPadding,
    },
  },

  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
    address: {
      color: colors.light.silverGrey,
    },
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.mainBg,
    },
    address: {
      color: colors.light.whiteSmoke,
    },
  },
});
