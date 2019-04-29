import { Platform, DeviceInfo } from 'react-native';
import { themes, colors, boxes } from '../../constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: boxes.boxPadding,
      paddingBottom: (Platform.OS === 'ios' && DeviceInfo.isIPhoneX_deprecated) ? (4 * boxes.boxPadding) : (2 * boxes.boxPadding),
    },
  },

  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.screenBgNavy,
    },
  },
});
