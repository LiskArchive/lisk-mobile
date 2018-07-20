import { StyleSheet, DeviceInfo } from 'react-native';
import styleGuide from '../../../constants/styleGuide';

const styles = {
  container: {
    height: '100%',
  },
  innerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 60,
    paddingBottom: 60,
  },
  button: {
    top: 20,
    marginRight: styleGuide.boxes.boxPadding,
    marginLeft: styleGuide.boxes.boxPadding,
  },
  stickyButton: {
    borderWidth: 0,
  },
  subtitle: {
    marginTop: 20,
    color: styleGuide.colors.grayScale2,
  },
  input: {
    marginTop: 0,
  },
  titleContainer: {
    marginRight: styleGuide.boxes.boxPadding,
    marginLeft: styleGuide.boxes.boxPadding,
  },
  iosKeyboard: {
    backgroundColor: 'transparent',
    marginBottom: DeviceInfo.isIPhoneX_deprecated ? -98 : -65,
  },
  androidKeyboard: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
    zIndex: 9999,
  },
};

export default StyleSheet.create(styles);
