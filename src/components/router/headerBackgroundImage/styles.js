import { themes, colors } from '../../../constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      backgroundColor: colors.dark.navigationBg,
    },
    image: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: 400,
      minWidth: '100%',
      height: 90,
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
