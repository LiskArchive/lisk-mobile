import { colors } from '../../../../constants/styleGuide';
import { deviceHeight } from '../../../../utilities/device';

const height = deviceHeight();

export default () => ({
  common: {
    splashContainer: {
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 0,
      width: '100%',
      height: '100%',
    },
    splashBg: {
      backgroundColor: colors.light.ultramarineBlue,
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 0,
      width: '100%',
      height: '100%',
      opacity: 0.3,
    },
    splashFigure: {
      width: '100%',
      position: 'absolute',
      alignItems: 'center',
    },
    splashStatic: {
      zIndex: 2,
      top: height <= 640 ? 40 : 100,
    },
    splashStaticSimplified: {
      zIndex: 2,
      top: height <= 640 ? 40 : 24,
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
    splashLogo: {
      position: 'relative',
      top: 20,
    },
  }
});
