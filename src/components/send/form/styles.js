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
    backgroundColor: styleGuide.colors.white,
    paddingTop: 36,
    paddingBottom: 60,
  },
  button: {
    top: 20,
    marginRight: styleGuide.boxes.boxPadding,
    marginLeft: styleGuide.boxes.boxPadding,
  },
  stickyButton: {
    borderRadius: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  subtitle: {
    marginTop: 7,
    color: styleGuide.colors.grayScale2,
  },
  input: {
    marginTop: 0,
  },
  headings: {
    marginRight: styleGuide.boxes.boxPadding,
    marginLeft: styleGuide.boxes.boxPadding,
  },
  balanceWrapper: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: styleGuide.colors.grayScale5,
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 16,
    paddingRight: styleGuide.boxes.boxPadding,
    paddingLeft: styleGuide.boxes.boxPadding,
  },
  balanceValue: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 8,
  },
  number: {
    color: styleGuide.colors.primary5,
    lineHeight: 25,
  },
  unit: {
    color: styleGuide.colors.primary5,
    lineHeight: 25,
    marginLeft: 5,
    marginTop: -3,
  },
  iosKeyboard: {
    backgroundColor: 'transparent',
    marginBottom: DeviceInfo.isIPhoneX_deprecated ? -89 : -59,
    borderRadius: 0,
  },
  androidKeyboard: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
    zIndex: 9999,
    borderRadius: 0,
  },
  avatar: {
  },
};

export default StyleSheet.create(styles);
