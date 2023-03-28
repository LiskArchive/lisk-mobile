import { themes, colors, boxes } from 'constants/styleGuide';

export default function getAccountDetailsScreenStyles() {
  return {
    common: {
      flex: {
        flex: 1,
      },
      container: {
        padding: boxes.boxPadding,
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
