import { themes, colors, boxes } from 'constants/styleGuide';

export default function getTransactionListStyles() {
  return {
    common: {
      wrapper: {
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
      wrapper: {
        backgroundColor: colors.light.white,
      },
      title: {
        color: colors.light.zodiacBlue,
      },
    },
    [themes.dark]: {
      wrapper: {
        backgroundColor: colors.dark.mainBg,
      },
      title: {
        color: colors.light.white,
      },
    },
  };
}
