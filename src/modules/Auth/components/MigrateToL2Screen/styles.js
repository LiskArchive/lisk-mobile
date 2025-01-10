import { colors, themes, boxes } from 'constants/styleGuide';

export default function getAccountsManagerScreenStyles() {
  return {
    common: {
      container: {
        flex: 1,
        padding: boxes.boxPadding,
      },
      migrateToL2Card: {
        marginBottom: 16,
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.dark.white,
      },
    },
    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.black,
      },
    },
  };
}
