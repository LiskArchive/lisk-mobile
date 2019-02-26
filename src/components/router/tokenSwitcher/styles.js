import { themes, colors } from '../../../constants/styleGuide';

export default () => ({
  common: {
    title: {
      margin: 0,
    },
    button: {
      margin: 0,
    },
  },
  [themes.light]: {
    title: {
      color: colors.light.blue,
    },
  },
  [themes.dark]: {
    title: {
      color: colors.dark.blue,
    },
  },
});
