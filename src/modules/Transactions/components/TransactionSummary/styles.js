import { themes, colors } from 'constants/styleGuide';

export default function getTransactionSummaryStyles() {
  return {
    common: {
      container: {
        flex: 1,
      },
      label: {
        fontWeight: '400',
        fontSize: 14,
        color: colors.light.blueGray,
      },
      valueText: {
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 18,
        color: colors.light.zodiacBlue,
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      fieldRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.light.platinumGray,
      },
      messageRow: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingTop: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.light.platinumGray,
      },
      tokenSvg: {
        marginLeft: 8,
      },
      applicationLogoImage: {
        borderRadius: 50,
        width: 24,
        height: 24,
        marginLeft: 8,
        borderWidth: 1,
        borderColor: colors.light.platinumGray,
      },
      applicationNameContainer: {
        alignItems: 'flex-end',
      },
      avatar: {
        marginRight: 8,
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
      },
      valueText: {
        color: colors.light.zodiacBlue,
      },
    },
    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
      },
      valueText: {
        color: colors.light.white,
      },
    },
  };
}
