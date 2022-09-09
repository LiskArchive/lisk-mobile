import { themes, colors } from 'constants/styleGuide'

export default function getTransactionRowStyles() {
  return {
    common: {
      container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 24,
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
        fontSize: 16,
        lineHeight: 19,
        marginBottom: 8,
      },
      date: {
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 14,
      },
      image: {
        borderRadius: 50,
        width: 40,
        height: 40,
        marginRight: 12,
      },
      incomingAmount: {
        fontWeight: '500',
        fontSize: 16,
      },
      outgoingAmount: {
        fontWeight: '500',
        fontSize: 16,
      },
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
  }
}
