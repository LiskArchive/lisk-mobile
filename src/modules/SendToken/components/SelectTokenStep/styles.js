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
        marginBottom: 8,
        color: colors.light.blueGray
      },
      priorityButtonText: {
        color: colors.light.zodiacBlue,
        fontWeight: '300'
      },
      priorityButtonFeeText: {
        color: colors.light.zodiacBlue,
        fontWeight: '600'
      },
      text: {
        color: colors.light.blueGray
      },
      prevStepButton: {
        marginRight: 16,
        flex: 1
      },
    },
    [themes.light]: {
      wrapper: {
        backgroundColor: colors.light.white,
      },
      text: {
        color: colors.light.blueGray
      },
      label: {
        color: colors.light.blueGray
      },
      priorityButtonText: {
        color: colors.light.zodiacBlue,
      },
      priorityButtonFeeText: {
        color: colors.light.zodiacBlue,
      },
    },
    [themes.dark]: {
      wrapper: {
        backgroundColor: colors.dark.mainBg,
      },
      text: {
        color: colors.light.whiteSmoke
      },
      label: {
        color: colors.light.white
      },
      priorityButtonText: {
        color: colors.light.whiteSmoke
      },
      priorityButtonFeeText: {
        color: colors.light.whiteSmoke,
      },
      prevStepButton: {
        color: colors.light.whiteSmoke,
      }
    },
  };
}
