import { themes, colors } from '../../../constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      width: '100%',
      flex: 1,
    },
    image: {
      width: 400,
      height: 200,
      minWidth: '100%',
    },
  },
  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.brandingBlue,
    },
    image: {
      opacity: 1,
    },
  },
  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.navigationBg,
    },
    image: {
      opacity: 0.6,
    },
  },
});
