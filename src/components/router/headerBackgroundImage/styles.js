import { themes, colors } from '../../../constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      backgroundColor: colors.dark.navigationBg,
    },
    image: {
      position: 'absolute',
      width: '100%',
      left: 0,
      top: 0,
    },
  },
  [themes.light]: {
    image: {
      opacity: 1,
    },
  },
  [themes.dark]: {
    image: {
      opacity: 0.6,
    },
  },
});
