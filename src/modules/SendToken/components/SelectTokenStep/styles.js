import { themes, colors, boxes } from 'constants/styleGuide';
import { Platform } from 'react-native';

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
      addMessageLabel: { fontSize: 14, marginBottom: 16 },
      addMessageLabelContainer: { width: 178 },
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
      feeBreakdownContainer: {
        padding: 8,
        borderRadius: 4,
        backgroundColor: colors.light.athensWhite,
      },
      feeBreakdownRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
      },
      labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
      },
      logo: {
        height: 20,
        width: 20,
        borderRadius: 10,
        marginLeft: 8,
      },
      primaryText: {
        color: colors.light.ultramarineBlue,
      },
      secondaryText: {
        color: colors.light.smoothGray,
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
      boldText: {
        fontWeight: '600',
      },
      messageFeeText: {
        marginRight: 20,
      },
      prevStepButton: {
        marginRight: 16,
        flex: 1,
      },
      footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: boxes.boxPadding,
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
      feeBreakdownContainer: {
        backgroundColor: colors.light.white,
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
      feeBreakdownContainer: {
        backgroundColor: colors.dark.textInputBg,
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
      paddingTop: Platform.select({ ios: 15, default: 16 }),
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
