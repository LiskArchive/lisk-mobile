import { Dimensions, Platform, DeviceInfo } from 'react-native';
import { themes, colors } from '../../constants/styleGuide';

const { height } = Dimensions.get('window');

export default () => ({
  common: {
    wrapper: {
      flex: 1,
    },
    container: {
      flexDirection: 'column',
      flex: 1,
      padding: 20,
      justifyContent: 'space-between',
      paddingBottom: (Platform.OS === 'ios' && DeviceInfo.isIPhoneX_deprecated) ? 30 : 20,
    },
    header: {
      marginTop: 8,
    },
    subHeader: {
      marginTop: 14,
      marginBottom: 25,
    },
    row: {
      flexDirection: 'row',
      paddingRight: 50,
      marginBottom: height > 640 ? 10 : 3,
      paddingBottom: height > 640 ? 14 : 3,
    },
    separator: {
      borderBottomWidth: 1,
    },
    rowTitle: {
      marginTop: 5,
    },
    icon: {
      marginRight: 12,
      marginTop: 10,
    },
    description: {
      marginTop: 5,
    },
    label: {
      marginLeft: 12,
    },
  },

  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
    header: {
      color: colors.light.black,
    },
    subHeader: {
      color: colors.light.gray2,
    },
    separator: {
      borderBottomColor: colors.light.gray5,
    },
    rowTitle: {
      color: colors.light.black,
    },
    description: {
      color: colors.light.gray2,
    },
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.screenBgNavy,
    },
    header: {
      color: colors.dark.white,
    },
    subHeader: {
      color: colors.dark.gray1,
    },
    separator: {
      borderBottomColor: colors.dark.gray5,
    },
    rowTitle: {
      color: colors.dark.white,
    },
    description: {
      color: colors.dark.gray4,
    },
  },
});
