import { Dimensions, Platform, DeviceInfo } from 'react-native';
import { colors } from '../../constants/styleGuide';

const { height } = Dimensions.get('window');

export default () => ({
  common: {
    wrapper: {
      backgroundColor: colors.white,
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
      color: colors.grayScale1,
    },
    row: {
      flexDirection: 'row',
      paddingRight: 50,
      marginBottom: height > 640 ? 10 : 3,
      paddingBottom: height > 640 ? 14 : 3,
    },
    separator: {
      borderBottomColor: colors.grayScale5,
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
      color: colors.grayScale2,
      marginTop: 5,
    },
    label: {
      color: colors.grayScale2,
      marginLeft: 12,
    },
  },
});
