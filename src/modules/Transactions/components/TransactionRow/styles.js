import { themes, colors } from 'constants/styleGuide';

export default function getTransactionRowStyles() {
  return {
    common: {
      container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 8,
      },
      column: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
      addressText: {
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 19,
        marginBottom: 8
      },
      date: {
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 14
      }
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
      },
      title: {
        color: colors.light.zodiacBlue,
      },
      addressText: {
        color: colors.light.zodiacBlue,
      },
      date: {
        color: colors.light.slateGray,
      },
    },
    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
      },
      title: {
        color: colors.light.white,
      },
      addressText: {
        color: colors.light.white,
      },
      date: {
        color: colors.light.silverGrey,
      },
    },
  };
}
