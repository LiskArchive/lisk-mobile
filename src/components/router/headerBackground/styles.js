import { themes, colors } from '../../../constants/styleGuide';
import { setColorOpacity } from '../../../utilities/helpers';

export default () => ({
  common: {
    wrapper: {
      flex: 1,
      borderBottomWidth: 1,
    },
  },
  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.headerBg,
    },
    bordered: {
      borderBottomColor: colors.light.whiteSmoke,
    },
    nonBordered: {
      borderBottomColor: colors.light.whiteSmoke,
    },
  },
  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.headerBg,
    },
    bordered: {
      borderBottomColor: setColorOpacity(colors.light.white, 0.24),
    },
    nonBordered: {
      borderBottomColor: 'transparent',
    },
  },
});
