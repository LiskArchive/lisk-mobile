import { DeviceInfo, Platform, Dimensions } from 'react-native';
import { Header } from 'react-navigation';
import { colors } from '../../constants/styleGuide';
import { merge } from '../../utilities/helpers';

let wrapper = {
  backgroundColor: colors.light.brandingBlue,
};

if (Platform.OS === 'ios') {
  wrapper = {
    zIndex: 10,
    top: DeviceInfo.isIPhoneX_deprecated ? Header.HEIGHT + 23 : Header.HEIGHT,
    left: 0,
    position: 'absolute',
  };
}

const { width } = Dimensions.get('window');
const height = Math.floor((16 / 523) * width);

export default () => ({
  common: {
    wrapper: merge({
      width: '100%',
      height: 4,
      overflow: 'hidden',
    }, wrapper),
    animation: {
      width,
      height,
      top: 0,
      left: 0,
      position: 'absolute',
    },
  },
});
