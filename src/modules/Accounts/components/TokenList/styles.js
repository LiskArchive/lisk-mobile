import { themes, colors, fonts } from 'constants/styleGuide';
import { setColorOpacity } from 'utilities/helpers';

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
      tabItemActive: {
        backgroundColor: setColorOpacity(colors.dark.ultramarineBlue, 0.3),
      },
      loadingText: {
        color: colors.dark.ghost,
      },
    },
  };
}
