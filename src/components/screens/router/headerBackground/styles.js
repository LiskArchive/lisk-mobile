import { themes, colors } from '../../../../constants/styleGuide';
import { setColorOpacity } from '../../../../utilities/helpers';

export default () => ({
  common: {
    wrapper: {
      flex: 1,
      borderBottomWidth: 1,
    },
  },
  [themes.light]: {
    bordered: {
      borderBottomColor: colors.light.whiteSmoke,
      backgroundColor: colors.light.headerBg,
    },
    nonBordered: {
      borderBottomColor: colors.light.whiteSmoke,
      backgroundColor: colors.light.headerBg,
    },
  },
  [themes.dark]: {
    bordered: {
      borderBottomColor: setColorOpacity(colors.light.white, 0.15),
      backgroundColor: colors.dark.headerBg,
    },
    nonBordered: {
      borderBottomColor: 'transparent',
      backgroundColor: colors.dark.headerBg,
    },
  },
});
