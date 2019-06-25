import { StyleSheet } from 'react-native';
import { themes, colors } from '../../../constants/styleGuide';
import { setColorOpacity } from '../../../utilities/helpers';

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
  },
  [themes.dark]: {
    style: {
      backgroundColor: colors.dark.headerBg,
      borderTopColor: setColorOpacity(colors.dark.white, 0.15),
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
  },
});
