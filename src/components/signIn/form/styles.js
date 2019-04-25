import { StyleSheet } from 'react-native';
import { colors, fonts, boxes } from '../../../constants/styleGuide';
import { deviceHeight, deviceType } from '../../../utilities/device';

const height = deviceHeight();

const styles = {
  container: {
    height: '100%',
    paddingTop: height <= 640 ? 110 : 170,
  },
  row: {
    flexDirection: 'row',
  },
  paddingBottom: {
    paddingBottom: height <= 640 ? 0 : 40,
  },
  title: {
    paddingLeft: boxes.boxPadding,
    paddingRight: boxes.boxPadding,
    textAlign: 'center',
    color: colors.light.gray2,
    fontSize: fonts.size.base,
    opacity: height <= 640 ? 0 : 1,
  },
  input: {
    fontFamily: fonts.family.passphrase,
    textAlign: 'justify',
  },
  linkWrapper: {
    width: '100%',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  question: {
    color: colors.light.gray2,
    textAlign: 'center',
    marginRight: 4,
    marginBottom: 5,
  },
  link: {
    color: colors.light.blue,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scanButton: {
    position: 'absolute',
    right: 21,
    zIndex: 99,
    top: 46,
    paddingLeft: 10,
    paddingBottom: 10,
    width: 67,
    height: 30,
  },
  scanButtonTitle: {
    fontSize: 14,
    paddingLeft: 5,
    color: colors.light.blue,
  },
  longTitle: {
    width: 87,
  },
  cameraRoll: {
    borderTopColor: colors.light.white,
    borderTopWidth: deviceType() === 'iOSx' ? 74 : 50,
  },
  cameraOverlay: {
    borderTopColor: 'rgba(57, 68, 81, 0.85)',
    borderTopWidth: deviceType() === 'iOSx' ? 34 : 10,
  },
  backButton: {
    position: 'absolute',
    width: 130,
    height: 32,
    left: 3,
    top: deviceType() === 'iOSx' ? 48 : 24,
  },
  backButtonTitle: {
    color: colors.light.blue,
  },
};

export default StyleSheet.create(styles);
