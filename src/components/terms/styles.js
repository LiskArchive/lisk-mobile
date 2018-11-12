import { themes, colors, boxes } from '../../constants/styleGuide';

export default () => ({
  common: {
    container: {
      height: '100%',
    },
    innerContainer: {
      flex: 1,
      flexDirection: 'column',
      marginRight: boxes.boxPadding,
      marginLeft: boxes.boxPadding,
      paddingTop: 36,
      paddingBottom: 35,
    },
    header: {
      marginBottom: 6,
    },
    itemTitle: {
      marginTop: 16,
      marginBottom: 8,
    },
    itemDescription: {
      lineHeight: 22,
    },
  },

  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
    },
    header: {
      color: colors.light.black,
    },
    subTitle: {
      color: colors.light.gray2,
    },
    itemTitle: {
      color: colors.light.black,
    },
    itemDescription: {
      color: colors.light.gray2,
      lineHeight: 22,
    },
  },

  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.screenBgNavy,
    },
    header: {
      color: colors.dark.white,
    },
    subTitle: {
      color: colors.dark.gray3,
    },
    itemTitle: {
      color: colors.dark.white,
    },
    itemDescription: {
      color: colors.dark.gray3,
    },
  },
});
