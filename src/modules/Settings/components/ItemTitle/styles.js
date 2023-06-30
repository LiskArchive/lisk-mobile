import { themes, colors, fonts } from 'constants/styleGuide';

export default () => ({
  common: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    titleContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 5,
      marginRight: 5,
    },
    title: {
      fontSize: fonts.size.input,
    },
    subtitle: {
      marginLeft: 4,
      fontSize: fonts.size.small,
    },
    icon: {
      marginRight: 8,
    },
    arrow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    arrowIcon: {
      marginLeft: 5,
    },
  },

  [themes.light]: {
    title: {
      color: colors.light.maastrichtBlue,
    },
    subtitle: {
      color: colors.light.slateGray,
    },
  },

  [themes.dark]: {
    title: {
      color: colors.dark.platinum,
    },
    subtitle: {
      color: colors.light.slateGray,
    },
  },
});
