import { Dimensions } from 'react-native';

import { themes, colors, fonts, } from 'constants/styleGuide';

export function getPickerStyles(error) {
  return {
    common: {
      label: {
        color: colors.light.maastrichtBlue,
        fontSize: fonts.size.input,
        marginBottom: 8,
      },
      toggleContainer: {
        borderWidth: 1,
        borderRadius: 10,
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
        color: colors.light.ghost,
        fontWeight: '400'
      },
      menuModalContainer: {
        height: Dimensions.get('window').height / 1.8,
      },
      menuContainer: {
        flex: 1,
        width: '100%',
      },
      itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 16,
        width: '100%',
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
