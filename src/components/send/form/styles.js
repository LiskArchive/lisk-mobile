import { StyleSheet, DeviceInfo, Dimensions } from 'react-native';
import { colors, boxes } from '../../../constants/styleGuide';


const { height, width } = Dimensions.get('window');
const styles = {
  container: {
    height: '100%',
  },
  innerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    paddingTop: 36,
    paddingBottom: 60,
  },
  button: {
    top: 20,
    marginRight: boxes.boxPadding,
    marginLeft: boxes.boxPadding,
  },
  stickyButton: {
    borderRadius: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  subtitle: {
    marginTop: 7,
    color: colors.grayScale2,
  },
  input: {
    marginTop: 0,
  },
  headings: {
    marginRight: boxes.boxPadding,
    marginLeft: boxes.boxPadding,
  },
  balanceWrapper: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: colors.grayScale5,
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 16,
    paddingRight: boxes.boxPadding,
    paddingLeft: boxes.boxPadding,
  },
  balanceValue: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 8,
  },
  number: {
    color: colors.primary5,
    lineHeight: 25,
  },
  unit: {
    color: colors.primary5,
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
  cameraPreview: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    height,
    width,
    zIndex: 99,
  },
  cameraOverlay: {
    backgroundColor: '#394451',
    opacity: 0.85,
    // width: 200,
    paddingLeft: 20,

    paddingRight: 20,
    paddingTop: 24,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scanButton: {
    position: 'absolute',
    right: 10,
    zIndex: 99,
    top: 33,
    paddingRight: 15,
    paddingLeft: 10,
    paddingBottom: 10,
    width: 80,
    height: 30,
  },
  scanButtonTitle: {
    fontSize: 14,
    color: colors.primary5,
    width: 39,
    lineHeight: 30,
    paddingLeft: 5,
  },
  galleryButton: {
    borderRadius: 4,
    height: 48,
    width: 48,
    backgroundColor: colors.primary5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryDescription: {
    color: '#fff',
    maxWidth: 230,
  },
};

export default StyleSheet.create(styles);
