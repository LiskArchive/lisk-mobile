import { themes, colors } from '../../../constants/styleGuide';

export default () => ({
  common: {
    flex: {
      flex: 1,
    },
    container: {
      flex: 1,
    },
    contentContainer: {
      paddingRight: 20,
      paddingLeft: 20,
      paddingTop: 20,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
    },
  },
  [themes.light]: {
    contentContainer: {
      backgroundColor: colors.light.white,
    },
  },
  [themes.dark]: {
    contentContainer: {
      backgroundColor: colors.dark.black,
    },
  },
});
