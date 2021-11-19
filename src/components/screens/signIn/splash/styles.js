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
    },
    splashBg: {
      backgroundColor: colors.light.ultramarineBlue,
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 0,
      width: '100%',
      opacity: 0.3,
    },
    splashFigure: {
      width: '100%',
      position: 'absolute',
      alignItems: 'center',
    },
    splashStatic: {
      top: height <= 640 ? 20 : 80,
    },
    splashStaticSimplified: {
      top: height <= 640 ? 30 : 0,
    },
    splashAnimating: {
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
