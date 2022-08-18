import { themes, colors, boxes } from 'constants/styleGuide';

export default function getTransactionListStyles() {
  return {
    common: {
      container: {
        flex: 1,
        paddingTop: boxes.boxPadding,
        paddingBottom: boxes.boxPadding,
        paddingLeft: boxes.boxPadding,
        paddingRight: boxes.boxPadding
      },
      title: {
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 18,
      }
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
      },
      title: {
        color: colors.light.zodiacBlue,
      },
    },
    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
      },
      title: {
        color: colors.light.white,
      },
    },
  };
}
