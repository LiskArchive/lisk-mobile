import { themes, colors } from 'constants/styleGuide';
export default function getNotFoundStyles() {
  return {
    common: {
      container: {
        flex: 1,
      },
      illustration: {
        marginBottom: 8,
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
      },
    },
    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.black,
      },
    },
  };
}
