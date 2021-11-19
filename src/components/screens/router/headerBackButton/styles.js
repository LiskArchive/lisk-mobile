import { fonts } from '../../../../constants/styleGuide';
import { deviceType } from '../../../../utilities/device';

const type = deviceType();
let normalMarginTop = type === 'iOSx' ? -3 : 0;
let safeAreaMarginTop = type === 'iOSx' ? 50 : 20;

if (type === 'android') {
  normalMarginTop = 0;
  safeAreaMarginTop = 0;
}

export default () => ({
  common: {
    title: {
      fontFamily: fonts.family.heading,
      fontSize: 24,
    },
    paddingLeft: {
      paddingLeft: 20,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: normalMarginTop,
    },
    main: {
      width: 50,
      height: 40,
    },
    safeArea: {
      marginTop: safeAreaMarginTop,
    }
  }
});
