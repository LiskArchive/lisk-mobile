import { colors, themes, boxes } from 'constants/styleGuide';

export default function getAccountsManagerScreenStyles() {
  return {
    common: {
      wrapper: {
        flex: 1,
        paddingTop: boxes.boxPadding,
      },
      container: {
        flex: 1,
        padding: boxes.boxPadding,
      },
    },
    [themes.light]: {
      wrapper: {
        backgroundColor: colors.dark.white,
      },
    },

    [themes.dark]: {
      wrapper: {
        backgroundColor: colors.dark.black,
      },
    },
  };
}
