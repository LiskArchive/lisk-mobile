import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../../../constants/styleGuide';
import { deviceHeight, deviceType } from '../../../../utilities/device';

const height = deviceHeight();

const styles = {
  container: {
    height: '100%',
    paddingTop: height <= 640 ? 110 : 170,
  },
  paddingBottom: {
    paddingBottom: height <= 640 ? 0 : 40,
  },
  input: {
    fontFamily: fonts.family.passphrase,
    textAlign: 'justify',
  },
  inputRevealed: {
    fontFamily: fonts.family.passphraseText,
  },
  passphraseRevealButton: {
    position: 'absolute',
    zIndex: 99,
    left: 85,
    top: 15,
  },
  scanButton: {
    position: 'absolute',
    right: 21,
    zIndex: 99,
    top: 15,
    paddingLeft: 10,
    width: 67,
    height: 30,
  },
  scanButtonTitle: {
    fontSize: fonts.size.small,
    color: colors.light.maastrichtBlue,
    paddingLeft: 6,
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
    color: colors.light.ultramarineBlue,
  },
  innerContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  outerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
  },
};

export default StyleSheet.create(styles);
