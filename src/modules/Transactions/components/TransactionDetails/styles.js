import { themes, colors, boxes, fonts } from 'constants/styleGuide';

export default function getTransactionDetailsStyles() {
  return {
    common: {
      flex: {
        flex: 1,
      },
      content: {
        padding: boxes.boxPadding,
      },
      section: {
        paddingBottom: 14,
        marginBottom: 16,
        borderBottomWidth: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        borderBottomColor: colors.light.mystic,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      column: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: 1,
      },
      text: {
        fontFamily: fonts.family.contextSemiBold,
        fontSize: 16,
      },
      label: {
        fontFamily: fonts.family.context,
        fontSize: 14,
        marginBottom: 8,
      },
      date: {
        fontFamily: fonts.family.context,
        fontSize: 14,
        lineHeight: 18,
      },
      statusContainer: {
        padding: 8,
        borderRadius: 6,
        alignSelf: 'flex-start',
      },
      statusText: {
        fontSize: 14,
        fontFamily: fonts.family.contextSemiBold,
      },
      showParamsButton: {
        fontFamily: fonts.family.context,
        fontSize: 14,
        alignSelf: 'flex-start',
      },
      params: {
        padding: 10,
        borderRadius: 5,
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
      },
      text: {
        color: colors.light.zodiacBlue,
      },
      label: {
        color: colors.light.slateGray,
      },
      date: {
        color: colors.light.slateGray,
      },
      params: {
        backgroundColor: colors.light.athensWhite,
      },
    },
    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
      },
      text: {
        color: colors.dark.white,
      },
      label: {
        color: colors.dark.silverGrey,
      },
      date: {
        color: colors.dark.silverGrey,
      },
      params: {
        backgroundColor: colors.dark.headerBg,
      },
    },
  };
}
