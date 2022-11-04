import { themes, colors } from 'constants/styleGuide';
import { setColorOpacity } from 'utilities/helpers';

export function getTabsStyles() {
  return {
    common: {
      container: {
        flexDirection: 'row',
        marginBottom: 16,
        borderWidth: 1,
        borderRadius: 50,
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
        borderColor: colors.light.platinumGray,
      },
    },
    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
        borderColor: colors.dark.volcanicSand,
      },
    },
  };
}

export function getTabStyles(active) {
  return {
    common: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 18,
        paddingRight: 18,
        borderRadius: 50,
        flex: 0.5,
      },
      text: {
        color: active ? colors.light.ultramarineBlue : colors.light.zodiacBlue,
        fontSize: 14,
        fontWeight: active ? '600' : '400',
        textAlign: 'center',
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: active
          ? setColorOpacity(colors.light.ultramarineBlue, 0.1)
          : colors.light.white,
      },
      text: {
        color: active ? colors.light.ultramarineBlue : colors.light.zodiacBlue,
      },
    },

    [themes.dark]: {
      container: {
        backgroundColor: active
          ? setColorOpacity(colors.dark.ultramarineBlue, 0.3)
          : colors.dark.mainBg,
      },
      text: {
        color: active ? colors.dark.ultramarineBlue : colors.dark.white,
      },
    },
  };
}
