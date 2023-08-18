import { themes, colors, fonts } from 'constants/styleGuide';

export default function getTransactionListStyles() {
  return {
    common: {
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      headerExtraMargin: {
        marginBottom: 24,
      },
      title: {
        fontWeight: '500',
        fontSize: fonts.size.input,
        fontFamily: fonts.family.contextSemiBold,
      },
      labelButtonText: {
        fontSize: 12,
      },
      transactionAddressText: {
        fontWeight: '500',
        fontSize: fonts.size.base,
        lineHeight: 19,
      },
      loadingText: {
        fontSize: fonts.size.input,
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
