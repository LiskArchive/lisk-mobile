import { colors, themes } from 'constants/styleGuide';

export default () => ({
  common: {
    flex: {
      flex: 1,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 20,
    },
  },
  [themes.light]: {
    step: {
      color: colors.light.black,
    },
  },
  [themes.dark]: {
    step: {
      color: colors.dark.white,
    },
  },
});
