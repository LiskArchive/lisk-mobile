import { themes, colors, fonts, } from 'constants/styleGuide';

export function getPickerStyles(error) {
  return {
    common: {
      label: {
        color: colors.light.maastrichtBlue,
        fontSize: fonts.size.base,
        marginBottom: 8,
      },
      toggleContainer: {
        borderWidth: 1,
        borderRadius: 2,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      toggleText: {
        fontSize: 16,
        color: colors.light.zodiacBlue,
        fontWeight: '400',
      },
      togglePlaceholder: {
        fontSize: 16,
        color: colors.light.platinum,
        fontWeight: '400'
      },
      menuContainer: {
        height: '50%',
        zIndex: 3,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
      },
      itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
      },
      errorText: {
        marginTop: 8,
        marginBottom: 16,
        color: colors.light.burntSieanna,
      }
    },
    [themes.light]: {
      itemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: colors.light.platinumGray,
      },
      label: {
        color: colors.light.maastrichtBlue,
      },
      menuContainer: {
        backgroundColor: colors.light.white
      },
      toggleContainer: {
        borderColor: error ? colors.light.burntSieanna : colors.light.platinum,
        color: colors.light.maastrichtBlue,
      },
      toggleText: {
        color: colors.light.zodiacBlue
      }
    },
    [themes.dark]: {
      itemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: colors.dark.volcanicSand,
      },
      label: {
        color: colors.dark.platinum,
      },
      menuContainer: {
        backgroundColor: colors.dark.mainBg,
        borderWidth: 1,
      },
      toggleContainer: {
        color: colors.dark.white,
        borderColor: error ? colors.light.burntSieanna : colors.dark.volcanicSand,
      },
      toggleText: {
        color: colors.dark.white
      }
    },
  };
}
