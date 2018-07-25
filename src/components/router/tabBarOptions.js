import { Platform, DeviceInfo } from 'react-native';
import { merge } from '../../utilities/helpers';
import colors from '../../constants/styleGuide/colors';

const stylesheet = {
  style: {
    backgroundColor: colors.white,
    borderTopColor: colors.grayScale5,
    borderTopWidth: 1,
    zIndex: 99,
  },
  labelStyle: {
    fontSize: 12,
  },
};

if (Platform.OS === 'ios' && DeviceInfo.isIPhoneX_deprecated) {
  stylesheet.style.height = 55;
  stylesheet.style.paddingTop = 5;
} else if (Platform.OS === 'ios' && !DeviceInfo.isIPhoneX_deprecated) {
  stylesheet.style.height = 60;
  stylesheet.labelStyle.paddingBottom = 5;
}

export default merge({
  activeTintColor: colors.primary5,
  inactiveTintColor: colors.grayScale2,
  showIcon: true,
  showLabel: true,
  upperCaseLabel: false,
}, stylesheet);
