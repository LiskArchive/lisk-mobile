import { Platform, DeviceInfo } from 'react-native';
import { themes, colors, boxes } from '../../constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      flex: 1,
      padding: boxes.boxPadding,
      paddingBottom: (Platform.OS === 'ios' && DeviceInfo.isIPhoneX_deprecated) ? boxes.boxPadding * 2 : boxes.boxPadding,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  },

  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.maastrichtBlue,
    },
  },
});
