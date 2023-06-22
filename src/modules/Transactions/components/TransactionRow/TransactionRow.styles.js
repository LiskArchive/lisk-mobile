import { themes, fonts, colors } from 'constants/styleGuide';

export default function getTransactionRowStyles() {
  return {
    common: {
      container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
      },
      titleContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
      statusContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      addressText: {
        fontWeight: '500',
        fontSize: fonts.size.input,
        marginBottom: 8,
      },
      date: {
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 14,
      },
      icon: {
        width: 40,
        height: 40,
        marginRight: 12,
      },
      incomingAmount: {
        fontWeight: '500',
        fontSize: fonts.size.input,
      },
      outgoingAmount: {
        fontWeight: '500',
        fontSize: fonts.size.input,
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
        borderColor: colors.light.platinumGray,
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
      incomingAmount: {
        color: colors.light.ufoGreen,
      },
      outgoingAmount: {
        color: colors.light.black,
      },
    },
    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
        borderColor: colors.dark.volcanicSand,
      },
      title: {
        color: colors.dark.white,
      },
      addressText: {
        color: colors.dark.white,
      },
      date: {
        color: colors.dark.silverGrey,
      },
      incomingAmount: {
        color: colors.dark.ufoGreen,
      },
      outgoingAmount: {
        color: colors.dark.white,
      },
    },
  };
}
