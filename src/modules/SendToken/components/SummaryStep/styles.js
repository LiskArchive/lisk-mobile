import { themes, colors, boxes } from 'constants/styleGuide';

export default function getSendTokenSummaryStepStyles() {
  return {
    common: {
      container: {
        flex: 1,
        padding: boxes.boxPadding,
      },
      buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
