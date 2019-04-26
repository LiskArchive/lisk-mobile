import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/styleGuide';
import { deviceHeight } from '../../../utilities/device';

const height = deviceHeight();

const styles = {
  splashContainer: {
    backgroundColor: colors.light.white,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 0,
    width: '100%',
    height: '100%',
  },
  splashBg: {
    backgroundColor: colors.light.actionBlue,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 0,
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  splashTopButtons: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 375,
    height: 97,
    zIndex: 3,
  },
  topBubbles: {
    width: '100%',
    height: '100%',
    top: 0,
  },
  splashFigure: {
    height: 60,
    width: 153,
    left: '50%',
    marginLeft: -76,
    position: 'absolute',
  },
  splashStatic: {
    zIndex: 2,
    top: height <= 640 ? 40 : 100,
  },
  splashAnimating: {
    zIndex: 1,
    top: '50%',
    marginTop: -30,
  },
  splashImage: {
    height: 60,
    width: 153,
  },
  christmasHatContainer: {
    position: 'absolute',
    left: -12,
  },
  christmasHat: {
    width: 58,
    height: 43,
  },
};

export default StyleSheet.create(styles);
