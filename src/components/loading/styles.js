
import { StyleSheet, DeviceInfo, Platform } from 'react-native';
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

const styles = {
  wrapper: Object.assign({}, {
    width: '100%',
    height: 3,
    overflow: 'hidden',
  }, wrapper),
  animation: {
    width: '100%',
    height: 200,
    top: -59,
    left: 0,
    position: 'absolute',
  },
};

export default StyleSheet.create(styles);
