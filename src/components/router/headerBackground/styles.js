import { themes, colors } from '../../../constants/styleGuide';

export default () => ({
  common: {
    main: {
      flex: 1,
    },
  },
  [themes.light]: {
    main: {
      backgroundColor: colors.light.navigationBg,
    },
  },
  [themes.dark]: {
    main: {
      backgroundColor: colors.dark.navigationBg,
    },
  },
});
