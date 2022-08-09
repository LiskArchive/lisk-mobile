import { themes, colors, boxes } from 'constants/styleGuide';

export default function getSendTokenSelectTokenStepStyles() {
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
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      },
      feeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16
      },
      tokenSvg: {
        marginLeft: 8,
      },
      balanceText: {
        color: colors.light.ultramarineBlue,
      },
      tokenAmountInCurrencyText: {
        color: colors.light.slateGray
      },
      priorityButtonBase: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 108,
        borderWidth: 1,
        borderRadius: 60,
        fontWeight: '200',
        paddingTop: 8,
        paddingBottom: 8
      },
      notSelectedPriorityButton: {
        borderColor: colors.light.platinumGray,
        color: colors.light.platinumGray,
      },
      selectedPriorityButton: {
        borderColor: colors.light.ultramarineBlue,
      },
      label: {
        marginBottom: 8
      },
      priorityButtonText: {
        color: colors.light.zodiacBlue,
        fontWeight: '300'
      },
      priorityButtonFeeText: {
        color: colors.light.zodiacBlue,
        fontWeight: '600'
      }
    },
    [themes.light]: {
      wrapper: {
        backgroundColor: colors.light.white,
      },
    },
    [themes.dark]: {
      wrapper: {
        backgroundColor: colors.dark.mainBg,
      },
    },
  };
}
