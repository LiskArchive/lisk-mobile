import { themes, colors } from 'constants/styleGuide';

export default function getRegisterStyles() {
  return {
    common: {
      container: {
        flex: 1,
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
      },
    },
    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
      },
    },
  };
}
