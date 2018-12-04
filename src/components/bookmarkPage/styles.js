import { themes, colors, boxes } from '../../constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      flex: 1,
    },
    subtitle: {
      marginTop: 0,
    },
    titleContainer: {
      overflow: 'hidden',
    },
    form: {
      paddingBottom: 10,
    },
    input: {
      marginTop: 0,
      flexWrap: 'wrap',
      flex: 1,
    },
    headings: {
      marginRight: boxes.boxPadding,
      marginLeft: boxes.boxPadding,
    },
    addressContainer: {
      width: '100%',
    },
  },
  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
    subtitle: {
      color: colors.light.gray2,
    },
  },
  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.screenBgNavy,
    },
    subtitle: {
      color: colors.dark.gray4,
    },
  },
});
