import { Platform, DeviceInfo } from 'react-native';
import { themes, colors, boxes } from '../../constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      flex: 1,
    },
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: boxes.boxPadding,
      paddingBottom: (Platform.OS === 'ios' && DeviceInfo.isIPhoneX_deprecated) ? 30 : 20,
    },
    subHeader: {
      marginBottom: boxes.boxPadding,
    },
  },

  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
    subHeader: {
      color: colors.light.gray2,
    },
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.screenBgNavy,
    },
    subHeader: {
      color: colors.dark.gray1,
    },
  },
});
