import { Platform, DeviceInfo } from 'react-native';
import { merge } from '../../utilities/helpers';
import { colors } from '../../constants/styleGuide';

const stylesheet = {
  style: {
    backgroundColor: colors.light.white,
    borderTopColor: colors.light.gray5,
    borderTopWidth: 1,
    zIndex: 99,
  },
  labelStyle: {
    fontSize: 12,
  },
  indicatorStyle: {
    backgroundColor: colors.light.white,
  },
  allowFontScaling: false,
};

if (Platform.OS === 'ios' && DeviceInfo.isIPhoneX_deprecated) {
  stylesheet.style.height = 55;
  stylesheet.style.paddingTop = 5;
} else if (Platform.OS === 'ios' && !DeviceInfo.isIPhoneX_deprecated) {
  stylesheet.style.height = 60;
  stylesheet.labelStyle.paddingBottom = 5;
}

export default merge({
  activeTintColor: colors.light.blue,
  inactiveTintColor: colors.light.gray2,
  showIcon: true,
  showLabel: true,
  upperCaseLabel: false,
}, stylesheet);
