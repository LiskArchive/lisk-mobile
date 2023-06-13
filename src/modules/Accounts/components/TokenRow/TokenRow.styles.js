import { fonts, colors, themes } from 'constants/styleGuide';
import { setColorOpacity } from 'utilities/helpers';

export default function getTokenRowStyles() {
  return {
    common: {
      container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
      },
      flex: {
        flexDirection: 'row',
      },
      logo: {
        height: 28,
        width: 28,
        borderRadius: 14,
      },
      title: {
        marginLeft: 8,
        fontWeight: '500',
        fontSize: fonts.size.base,
      },
      balanceText: {
        marginBottom: 4,
        fontWeight: '500',
        fontSize: fonts.size.base,
      },
      currencyText: {
        fontWeight: '400',
        fontSize: 12,
      },
      row: {
        flexDirection: 'row',
      },
      alignCenter: {
        alignItems: 'center',
      },
      balanceContainer: {
        alignItems: 'flex-end',
      },
      blurBig: {
        width: 100,
        height: 30,
        marginLeft: -15,
      },
      blurMedium: {
        width: 77,
        height: 30,
        marginLeft: -10,
      },
      blurSmall: {
        width: 60,
        height: 30,
        marginLeft: -5,
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
        borderColor: colors.light.silverGrey,
      },
      title: {
        color: colors.light.zodiacBlue,
      },
      balanceText: {
        color: colors.light.zodiacBlue,
      },
      currencyText: {
        color: setColorOpacity(colors.light.zodiacBlue, 0.7),
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
      balanceText: {
        color: colors.dark.white,
      },
      currencyText: {
        color: setColorOpacity(colors.light.white, 0.7),
      },
    },
  };
}
