import { themes, colors, boxes } from 'constants/styleGuide';

export default function getAccountDetailsScreenStyles() {
  return {
    common: {
      container: {
        flex: 1,
        padding: boxes.boxPadding,
      },
      body: {
        flex: 1,
        padding: boxes.boxPadding,
      },
      text: {
        fontSize: 16,
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
      },
      text: {
        color: colors.light.zodiacBlue,
      },
    },
    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
      },
      text: {
        color: colors.dark.white,
      },
    },
  };
}
