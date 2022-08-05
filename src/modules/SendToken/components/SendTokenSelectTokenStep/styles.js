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
      },
      tokenSvg: {
        marginLeft: 8,
      },
      balanceText: {
        color: colors.light.ultramarineBlue,
      },
      tokenAmountInCurrencyText: {
        color: colors.light.slateGray
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
