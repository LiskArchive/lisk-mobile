import { StyleSheet } from 'react-native';
import { themes, colors } from '../../../constants/styleGuide';

export default () => ({
  common: {
    style: {
      borderTopWidth: StyleSheet.hairlineWidth,
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
      color: colors.light.ultramarineBlue,
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
      color: colors.dark.ultramarineBlue,
    },
    indicatorStyle: {
      backgroundColor: colors.dark.navigationBg,
    },
  },
});
