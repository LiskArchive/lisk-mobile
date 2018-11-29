import { themes, colors } from '../../../constants/styleGuide';

export default () => ({
  common: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    titleContainer: {
      flex: 1,
      marginLeft: 5,
      marginRight: 5,
    },
    title: {
    },
    subtitle: {
      paddingTop: 4,
      paddingBottom: 2,
      fontSize: 13,
    },
    icon: {
      width: 25,
    },
    arrow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  },

  [themes.light]: {
    title: {
      color: colors.light.gray1,
    },
    subtitle: {
      color: colors.light.gray2,
    },
  },

  [themes.dark]: {
    title: {
      color: colors.dark.gray4,
    },
    subtitle: {
      color: colors.light.gray2,
    },
  },
});
