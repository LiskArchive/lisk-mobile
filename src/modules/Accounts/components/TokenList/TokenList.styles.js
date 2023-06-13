import { themes, colors, fonts } from 'constants/styleGuide';
import { setColorOpacity } from 'utilities/helpers';

export default function getTokenListStyles() {
  return {
    common: {
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      headerExtraMargin: {
        marginBottom: 16,
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
      tabSingleItemText: {
        fontWeight: '500',
        fontSize: 14,
      },
      tabItemText: {
        fontSize: 14,
        color: colors.light.blueGray,
      },
      tabItemTextActive: {
        color: colors.light.ultramarineBlue,
        fontFamily: fonts.family.contextSemiBold,
        fontSize: 14,
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
      resultScreenContainer: {
        flex: undefined,
        maxHeight: 150,
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
      },
      tabSingleItemText: {
        color: colors.light.zodiacBlue,
      },
      tabItemActive: {
        backgroundColor: setColorOpacity(colors.light.ultramarineBlue, 0.1),
      },
      loadingText: {
        color: colors.light.zodiacBlue,
      },
    },
    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
      },
      tabSingleItemText: {
        color: colors.light.white,
      },
      tabItemActive: {
        backgroundColor: setColorOpacity(colors.dark.ultramarineBlue, 0.3),
      },
      loadingText: {
        color: colors.dark.ghost,
      },
    },
  };
}
