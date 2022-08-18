import { colors, fonts } from 'constants/styleGuide';

export default {
  common: {
    container: {
      marginVertical: 20,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    viewIcon: {
      marginLeft: 5,
    },
    tabsContainer: {
      flex: 1,
      flexDirection: 'row'
    },
    tabItem: {
      padding: 8,
      paddingHorizontal: 15,
      marginHorizontal: 5,
      borderRadius: 20,
    },
    tabItemText: {
      color: colors.light.blueGray,
      fontSize: 14,
    },
    tabItemTextActive: {
      color: colors.light.ultramarineBlue,
      fontFamily: fonts.family.contextSemiBold
    },
    tabItemActive: {
      backgroundColor: 'rgba(64, 112, 244, 0.102519)'
    },
    viewAll: {
      color: colors.light.ultramarineBlue,
      fontSize: 12,
    }
  }
};
