import { themes, colors } from 'constants/styleGuide';

export function getHeaderLogoStyles() {
  return {
    common: {
      container: {
        alignItems: 'center',
      },
      logo: {
        marginBottom: 16,
      },
    },
    [themes.light]: {
      title: {
        color: colors.light.zodiacBlue,
      },
    },
    [themes.dark]: {
      title: {
        color: colors.dark.white,
      },
    },
  };
}
