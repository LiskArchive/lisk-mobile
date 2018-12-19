import { themes, colors } from '../../../constants/styleGuide';

export default () => ({
  common: {
    style: {
      borderTopWidth: 1,
      zIndex: 99,
    },
  },
  [themes.light]: {
    style: {
      backgroundColor: colors.light.navigationBg,
      borderTopColor: colors.light.gray5,
    },
    inactiveTint: {
      color: colors.dark.gray2,
    },
    tint: {
      color: colors.light.blue,
    },
    indicatorStyle: {
      backgroundColor: colors.light.white,
    },
  },
  [themes.dark]: {
    style: {
      backgroundColor: colors.dark.navigationBg,
      borderTopColor: colors.dark.gray5,
    },
    inactiveTint: {
      color: colors.dark.gray2,
    },
    tint: {
      color: colors.dark.white,
    },
    indicatorStyle: {
      backgroundColor: colors.dark.navigationBg,
    },
  },
});
