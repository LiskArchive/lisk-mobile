import { themes, colors, boxes } from 'constants/styleGuide';

export default function getTransactionDetailsStyles() {
  return {
    common: {
      container: {
        flex: 1,
        paddingTop: boxes.boxPadding,
        paddingBottom: boxes.boxPadding,
        paddingLeft: boxes.boxPadding,
        paddingRight: boxes.boxPadding
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
      }
    },
    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
      }
    },
  };
}
