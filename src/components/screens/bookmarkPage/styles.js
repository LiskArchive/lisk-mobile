import { Platform } from 'react-native';
import {
  themes, colors, fonts
} from '../../../constants/styleGuide';
import { setColorOpacity } from '../../../utilities/helpers';

export default () => ({
  common: {
    wrapper: {
      flex: 1,
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
      bottom: 0,
      right: 0,
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
    wrapper: {
      backgroundColor: colors.light.white,
    },
    addButtonText: {
      color: colors.light.ultramarineBlue,
    },
    addButton: {
      borderBottomColor: colors.light.mystic,
    },
  },
  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.mainBg,
    },
    addButtonText: {
      color: colors.dark.ultramarineBlue,
    },
    addButton: {
      borderBottomColor: setColorOpacity(colors.light.white, 0.15),
    },
  },
});
