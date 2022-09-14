import { themes, colors } from 'constants/styleGuide';

export function getTabsStyles() {
  return {
    common: {
      container: {
        flexDirection: 'row',
        marginBottom: 16,
        borderColor: colors.light.platinumGray,
        borderWidth: 1,
        borderRadius: 50,
      },
    },
    [themes.light]: {},

    [themes.dark]: {},
  };
}

export function getTabStyles(active) {
  return {
    common: {
      container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: active ? colors.light.ultramarineBlue : colors.light.white,
        fontSize: 14,
        marginRight: 24,
        color: active ? colors.light.ultramarineBlue : colors.light.blueGray,
      },
    },
    [themes.light]: {},

    [themes.dark]: {},
  };
}
