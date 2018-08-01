
import { StyleSheet, DeviceInfo, Platform, Dimensions } from 'react-native';
import { Header } from 'react-navigation';
import styleGuide from '../../constants/styleGuide';

let wrapper = {
  backgroundColor: styleGuide.colors.primary3,
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
const height = Math.floor((10 / 523) * width);

const styles = {
  wrapper: Object.assign({}, {
    width: '100%',
    height: 2,
    overflow: 'hidden',
  }, wrapper),
  animation: {
    width,
    height,
    top: 0,
    left: 0,
    position: 'absolute',
  },
};

export default StyleSheet.create(styles);
