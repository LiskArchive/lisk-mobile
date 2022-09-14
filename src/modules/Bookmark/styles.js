import { Platform } from 'react-native';
import { themes, colors, fonts } from 'constants/styleGuide';
import { setColorOpacity } from 'utilities/helpers';

export default (tabBarHeight) => ({
  common: {
    container: {
      flexGrow: 1,
    },
    titleContainer: {
      backgroundColor: colors.light.ultramarineBlue,
      width: 54,
      height: 54,
      borderRadius: 26,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 2,
      position: 'absolute',
      bottom: tabBarHeight + 24,
      right: 16,
      margin: 20,
    },
    headerButton: {
      transform: [{ rotate: '45deg' }],
      width: 60,
      height: 40,
      marginTop: Platform.OS === 'ios' ? 6 : 12,
    },
    addButtonText: {
      maxWidth: '100%',
      fontFamily: fonts.family.heading,
      fontWeight: 'bold',
      fontSize: fonts.size.base,
    },
    form: {
      paddingBottom: 10,
      paddingTop: 10,
      flex: 1,
    },
    input: {
      marginTop: 0,
      flexWrap: 'wrap',
      flex: 1,
      paddingLeft: 35,
      ...Platform.select({
        android: {
          height: 48,
        },
        ios: {
          height: 48,
          paddingBottom: 10,
        },
      }),
    },
    searchIcon: {
      position: 'absolute',
      zIndex: 1,
      left: 30,
      bottom: 16,
    },
    addressContainer: {
      width: '100%',
    },
    addButton: {
      width: '100%',
      borderBottomWidth: 1,
      paddingBottom: 20,
      height: 55,
    },
    addButtonIcon: {
      transform: [{ rotate: '45deg' }],
    },
  },
  [themes.light]: {
    addButtonText: {
      color: colors.light.ultramarineBlue,
    },
    addButton: {
      borderBottomColor: colors.light.mystic,
    },
  },
  [themes.dark]: {
    addButtonText: {
      color: colors.dark.ultramarineBlue,
    },
    addButton: {
      borderBottomColor: setColorOpacity(colors.light.white, 0.15),
    },
  },
});
