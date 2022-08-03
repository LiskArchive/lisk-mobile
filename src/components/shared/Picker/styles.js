import { themes, colors } from 'constants/styleGuide';

export function getPickerStyles() {
  return {
    common: {
      label: {
        color: colors.light.maastrichtBlue,
        marginBottom: 8
      },
      toggleContainer: {
        borderWidth: 1,
        borderColor: colors.light.platinum,
        color: colors.light.maastrichtBlue,
        borderRadius: 2,
        padding: 16,
      },
      toggleTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
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
        backgroundColor: colors.light.white,
        height: '50%',
        zIndex: 3,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
      },
      itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.light.platinumGray,
      }
    },
    [themes.light]: {
      label: {
        color: colors.light.maastrichtBlue,
      },
      toggleContainer: {
        borderColor: colors.light.platinum,
        color: colors.light.maastrichtBlue,
      },
      toggleText: {
        color: colors.light.zodiacBlue
      }
    },
    [themes.dark]: {
      label: {
        color: colors.dark.platinum,
      },
      toggleContainer: {
        color: colors.dark.white,
        borderColor: colors.dark.mainBg,
      },
      toggleText: {
        color: colors.dark.white
      }
    },
  };
}
