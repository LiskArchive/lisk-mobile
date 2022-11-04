import { themes, colors } from 'constants/styleGuide';

export default function getTransactionListStyles() {
  return {
    common: {
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
      },
      loadingText: {
        fontSize: 14,
        marginTop: 8,
        marginBottom: 8,
      },
      resultScreenContainer: {
        flex: undefined,
        maxHeight: 150,
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
      },
      title: {
        color: colors.light.zodiacBlue,
      },
      loadingText: {
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
      loadingText: {
        color: colors.dark.ghost,
      },
      transactionAddressText: {
        color: colors.light.white,
      },
    },
  };
}
