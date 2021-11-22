import { colors } from '../../../../constants/styleGuide';
import { isSmallDevice } from '../../../../utilities/device';

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
      top: isSmallDevice ? 80 : 120,
    },
    splashStaticSimplified: {
      top: isSmallDevice ? 20 : 0,
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
