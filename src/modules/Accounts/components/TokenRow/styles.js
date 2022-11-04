import { colors, themes } from 'constants/styleGuide';
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
        borderColor: colors.light.platinumGray,
      },
      flex: {
        flexDirection: 'row',
      },
      title: {
        marginLeft: 8,
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
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
      },
      title: {
        color: colors.light.zodiacBlue,
      },
      currency: {
        color: setColorOpacity(colors.light.zodiacBlue, 0.7),
      },
    },
    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
      },
      title: {
        color: colors.dark.white,
      },
      currency: {
        color: setColorOpacity(colors.light.white, 0.7),
      },
    },
  };
}
