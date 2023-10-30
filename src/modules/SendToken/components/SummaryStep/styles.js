import { themes, colors, boxes } from 'constants/styleGuide';

export default function getSendTokenSummaryStepStyles() {
  return {
    common: {
      container: {
        flex: 1,
        padding: boxes.boxPadding,
      },
      footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: boxes.boxPadding,
      },
      buttonMarginVertical: {
        marginVertical: 16,
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
