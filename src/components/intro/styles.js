import { StyleSheet } from 'react-native';
import { colors } from '../../constants/styleGuide';
import { deviceHeight } from '../../utilities/device';

const styles = {
  wrapper: {
    backgroundColor: colors.primary9,
  },
  container: {
    height: '100%',
  },
  splashContainer: {
    backgroundColor: colors.white,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 0,
    width: '100%',
    height: '100%',
  },
  splashBg: {
    backgroundColor: colors.primary9,
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
  splashFigure: {
    height: 60,
    width: 153,
    left: '50%',
    marginLeft: -76,
    position: 'absolute',
  },
  splashStatic: {
    zIndex: 2,
    top: (deviceHeight() / 2) - 80,
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
  splashDescription: {
    height: 60,
    width: '80%',
    left: '10%',
    top: (deviceHeight() / 2) + 20,
    position: 'absolute',
    textAlign: 'center',
  },
  splashDescriptionP: {
    color: colors.grayScale2,
    textAlign: 'center',
  },
};

export default StyleSheet.create(styles);
