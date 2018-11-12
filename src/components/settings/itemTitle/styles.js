import { themes, colors } from '../../../constants/styleGuide';

export default () => ({
  common: {
    container: {
      flexDirection: 'row',
      width: '100%',
      height: 36,
      paddingTop: 6,
      paddingBottom: 6,
    },
    name: {
      flex: 1,
      height: 24,
    },
    nameText: {
      lineHeight: 20,
    },
    icon: {
      width: 26,
      height: 20,
      paddingRight: 2,
    },
    arrow: {
      width: 44,
      height: 24,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  },

  [themes.light]: {
    nameText: {
      color: colors.light.gray1,
    },
  },

  [themes.dark]: {
    nameText: {
      color: colors.dark.gray4,
    },
  },
});
