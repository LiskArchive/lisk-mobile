import { Platform, Dimensions } from 'react-native';
import { Header } from 'react-navigation';
import { colors } from '../../../constants/styleGuide';
import { merge } from '../../../utilities/helpers';
import { deviceType } from '../../../utilities/device';

let wrapper = {
  backgroundColor: colors.light.ultramarineBlue,
};

if (Platform.OS === 'ios') {
  wrapper = {
    zIndex: 10,
    top: deviceType() === 'iOSx' ? Header.HEIGHT + 24 : Header.HEIGHT + 1,
    left: 0,
    position: 'absolute',
  };
}

const { width } = Dimensions.get('window');
const height = Math.floor((16 / 523) * width);

export default () => ({
  common: {
    wrapper: merge(
      {
        width: '100%',
        height: 4,
        overflow: 'hidden',
      },
      wrapper
    ),
    animation: {
      width,
      height,
      top: 0,
      left: 0,
      position: 'absolute',
    },
  },
});
