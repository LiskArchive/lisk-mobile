import {
  colors, themes
} from 'constants/styleGuide';

export default function getAccountsManagerStyles() {
  return {
    common: {
      container: {
        flex: 1,
        width: '100%',
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.dark.white
      },
    },

    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.black
      },
    }
  };
}
