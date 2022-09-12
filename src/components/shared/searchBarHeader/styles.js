import { Platform } from 'react-native';
import { colors, fonts } from 'constants/styleGuide';

const paddingTop = Platform.OS === 'android' ? 16 : 10;

export default () => ({
  common: {
    navContainer: {
      paddingTop,
      height: 50,
    },
    title: {
      fontFamily: fonts.family.heading,
      fontSize: 24,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 20,
    },
    flex: {
      flex: 1,
      justifyContent: 'center',
    },
    cancelButton: {
      color: colors.light.ultramarineBlue,
    },
    miconButtonain: {
      padding: 10,
      backgroundColor: 'green',
    },
    searchIcon: {
      position: 'absolute',
      zIndex: 1,
      left: 30,
    },
    input: {
      flexWrap: 'wrap',
      paddingLeft: 35,
      paddingBottom: 10,
      paddingTop: 10,
      fontFamily: fonts.family.context,
    },
    inputContainer: {
      marginTop: -20,
    },
  },
});
