import { themes, colors, boxes } from 'constants/styleGuide';

export default function getTransactionListStyles() {
  return {
    common: {
      container: {
        flex: 1,
        paddingTop: boxes.boxPadding,
        paddingBottom: boxes.boxPadding,
        paddingLeft: boxes.boxPadding,
        paddingRight: boxes.boxPadding,
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      title: {
        fontWeight: '500',
        fontSize: 14,
      },
      labelButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      labelButtonText: {
        fontSize: 12,
      },

      transactionAddressText: {
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 19,
      }
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
      },
      title: {
        color: colors.light.zodiacBlue,
      },
      transactionAddressText: {
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
      transactionAddressText: {
        color: colors.light.white,
      },
    },
  };
}
