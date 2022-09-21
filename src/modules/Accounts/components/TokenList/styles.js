import { themes, colors, fonts } from 'constants/styleGuide';

export default function getTokenListStyles() {
  return {
    common: {
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
      },
      tabsContainer: {
        flexDirection: 'row',
      },
      tabItem: {
        padding: 8,
        paddingHorizontal: 16,
        marginRight: 8,
        borderRadius: 20,
      },
      tabItemTextActive: {
        color: colors.light.ultramarineBlue,
        fontFamily: fonts.family.contextSemiBold,
        fontSize: 12,
      },
      tabItemActive: {
        backgroundColor: 'rgba(64, 112, 244, 0.102519)',
      },
      labelButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      labelButtonText: {
        fontSize: 12,
      },
      loadingText: {
        fontSize: 14,
        marginTop: 8,
        marginBottom: 8,
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
      },
      loadingText: {
        color: colors.light.zodiacBlue,
      },
    },
    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
      },
      loadingText: {
        color: colors.dark.white,
      },
    },
  };
}
