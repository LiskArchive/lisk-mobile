import { colors, fonts, themes } from 'constants/styleGuide';
import { setColorOpacity } from 'utilities/helpers';

export default {
  common: {
    container: {
      marginTop: 20,
    },
    flex: {
      flex: 1,
    },
    rightContent: {
      alignItems: 'flex-end',
    },
    tokenTitle: {
      marginLeft: 8,
    },
    row: {
      flexDirection: 'row',
    },
    alignCenter: {
      alignItems: 'center',
    },
    tokenContainer: {
      marginTop: 8,
      marginBottom: 8,
    },
    tokenItem: {
      borderWidth: 1,
      borderRadius: 10,
      padding: 12,
      borderColor: colors.light.platinumGray,
    },
    tabsContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    tabItem: {
      padding: 8,
      paddingHorizontal: 16,
      marginRight: 8,
      borderRadius: 20,
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
    tabItemText: {
      color: colors.light.blueGray,
      fontSize: 14,
    },
    tabItemTextActive: {
      color: colors.light.ultramarineBlue,
      fontFamily: fonts.family.contextSemiBold,
    },
    tabItemActive: {
      backgroundColor: 'rgba(64, 112, 244, 0.102519)',
    },
    loadingText: {
      fontSize: 14,
      marginTop: 8,
      marginBottom: 8,
    },
  },
  [themes.light]: {
    tokenTitle: {
      color: colors.light.zodiacBlue,
    },
    loadingText: {
      color: colors.light.zodiacBlue,
    },
    currency: {
      color: setColorOpacity(colors.light.zodiacBlue, 0.7),
    },
  },
  [themes.dark]: {
    tokenTitle: {
      color: colors.dark.white,
    },
    loadingText: {
      color: colors.dark.white,
    },
    currency: {
      color: setColorOpacity(colors.light.white, 0.7),
    },
  },
};
