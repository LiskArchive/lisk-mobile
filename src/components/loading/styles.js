
import { StyleSheet, DeviceInfo } from 'react-native';
import { Header } from 'react-navigation';
import styleGuide from '../../constants/styleGuide';

const top = DeviceInfo.isIPhoneX_deprecated ? Header.HEIGHT + 23 : Header.HEIGHT;

const styles = {
  wrapper: {
    width: '100%',
    height: 3,
    position: 'absolute',
    zIndex: 10,
    top,
    left: 0,
    overflow: 'hidden',
  },
  stripe: {
    backgroundColor: styleGuide.colors.action4,
    position: 'absolute',
    width: 200,
    height: 3,
    top: 0,
  },
};

export default StyleSheet.create(styles);
