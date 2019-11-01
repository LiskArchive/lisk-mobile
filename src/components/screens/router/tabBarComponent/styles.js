import { StyleSheet } from 'react-native';
import { themes, colors } from '../../../../constants/styleGuide';

export default () => ({
  common: {
    style: {
      borderTopWidth: StyleSheet.hairlineWidth,
      zIndex: 99,
    },
  },
  [themes.light]: {
    style: {
      backgroundColor: colors.light.headerBg,
      borderTopColor: colors.light.whiteSmoke,
    },
    inactiveTint: {
      color: colors.dark.slateGray,
    },
    tint: {
      color: colors.light.ultramarineBlue,
    },
    indicatorStyle: {
      backgroundColor: colors.light.white,
    },
    activeTint: {
      color: colors.light.BTC,
    },
  },
  [themes.dark]: {
    style: {
      backgroundColor: colors.dark.footerBg,
      borderTopColor: colors.dark.slateGray,
    },
    inactiveTint: {
      color: colors.dark.slateGray,
    },
    tint: {
      color: colors.dark.ultramarineBlue,
    },
    indicatorStyle: {
      backgroundColor: colors.dark.headerBg,
    },
    activeTint: {
      color: colors.dark.ultramarineBlue,
    },
  },
});
