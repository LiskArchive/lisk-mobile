import { themes, colors } from '../../../constants/styleGuide';

export default () => ({
  common: {
    header: {
      flex: 1,
    },
  },
  [themes.light]: {
    BTC: {
      backgroundColor: colors.light.BTC,
    },
    LSK: {
      backgroundColor: colors.light.ultramarineBlue,
    },
  },
  [themes.dark]: {
    BTC: {
      backgroundColor: colors.light.BTC,
    },
    LSK: {
      backgroundColor: colors.dark.homeHeaderBg,
    },
  },
});
