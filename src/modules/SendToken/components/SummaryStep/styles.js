import { themes, colors, boxes } from 'constants/styleGuide';

export default function getSendTokenSummaryStepStyles() {
  return {
    common: {
      wrapper: {
        flex: 1,
        paddingLeft: boxes.boxPadding,
        paddingRight: boxes.boxPadding
      },
      container: {
        flex: 1,
      },
      label: {
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 18,
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
      buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
      confirmAndSignTransactionModal: {
        backgroundColor: colors.light.white,
        height: 560,
        zIndex: 3,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingLeft: boxes.boxPadding,
        paddingRight: boxes.boxPadding,
        paddingTop: 24,
        paddingBottom: 24
      },
      iconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 16,
      },
    },
    [themes.light]: {
      wrapper: {
        backgroundColor: colors.light.white,
      },
      container: {
        backgroundColor: colors.light.white,
      },
      valueText: {
        color: colors.light.zodiacBlue,
      },
      confirmAndSignTransactionModal: {
        backgroundColor: colors.light.white,
      }
    },
    [themes.dark]: {
      wrapper: {
        backgroundColor: colors.dark.mainBg,
      },
      container: {
        backgroundColor: colors.dark.mainBg,
      },
      valueText: {
        color: colors.light.white,
      },
      confirmAndSignTransactionModal: {
        backgroundColor: colors.dark.mainBg,
      }
    },
  };
}
