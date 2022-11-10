import { themes, colors, boxes } from 'constants/styleGuide';

export default function getSendTokenSelectTokenStepStyles() {
  return {
    common: {
      wrapper: {
        flex: 1,
      },
      container: {
        flex: 1,
        padding: boxes.boxPadding,
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      feeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
      },
      labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
      },
      tokenSvg: {
        marginLeft: 8,
      },
      balanceText: {
        color: colors.light.ultramarineBlue,
      },
      tokenAmountInCurrencyText: {
        color: colors.light.slateGray,
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
        paddingBottom: 8,
      },
      notSelectedPriorityButton: {
        borderColor: colors.light.platinumGray,
        color: colors.light.platinumGray,
      },
      selectedPriorityButton: {
        borderColor: colors.light.ultramarineBlue,
      },
      label: {
        fontSize: 14,
      },
      iconLabel: {
        marginRight: 6,
      },
      priorityButtonText: {
        color: colors.light.zodiacBlue,
        fontWeight: '300',
      },
      priorityButtonFeeText: {
        color: colors.light.zodiacBlue,
        fontWeight: '600',
      },
      text: {
        color: colors.light.blueGray,
      },
      prevStepButton: {
        marginRight: 16,
        flex: 1,
      },
      footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: boxes.boxPadding,
        paddingRight: boxes.boxPadding,
      },
    },
    [themes.light]: {
      wrapper: {
        backgroundColor: colors.light.white,
      },
      text: {
        color: colors.light.zodiacBlue,
      },
      label: {
        color: colors.light.zodiacBlue,
      },
      messageLabel: {
        color: colors.light.zodiacBlue,
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
        color: colors.light.whiteSmoke,
      },
      label: {
        color: colors.light.white,
      },
      messageLabel: {
        color: colors.light.white,
      },
      priorityButtonText: {
        color: colors.light.whiteSmoke,
      },
      priorityButtonFeeText: {
        color: colors.light.whiteSmoke,
      },
      prevStepButton: {
        color: colors.light.whiteSmoke,
      },
    },
  };
}

export function getSendTokenMessageFieldStyles(styles) {
  return {
    containerStyle: {
      paddingTop: 0,
      paddingRight: 0,
      paddingLeft: 0,
      ...styles?.container,
    },
    inputLabel: {
      marginBottom: 8,
      ...styles?.inputLabel,
    },
    input: {
      padding: 16,
      minHeight: 80,
      ...styles?.input,
    },
  };
}

export function getSendTokenAmountFieldStyles(styles) {
  return {
    containerStyle: {
      paddingTop: 0,
      paddingRight: 0,
      paddingLeft: 0,
      ...styles?.container,
    },
    inputLabel: {
      marginBottom: 8,
      ...styles?.inputLabel,
    },
    input: {
      padding: 16,
      ...styles?.input,
    },
  };
}
