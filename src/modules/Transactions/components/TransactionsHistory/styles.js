import { themes, colors, boxes } from 'constants/styleGuide';

export default function getTransactionsHistoryStyles() {
  return {
    common: {
      container: {
        flex: 1,
        padding: boxes.boxPadding,
      },
      header: {
        marginBottom: 24,
      },
      listContainer: {
        paddingLeft: boxes.boxPadding,
        paddingRight: boxes.boxPadding,
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
