import { colors, fonts } from 'constants/styleGuide';
import { deviceType } from 'utilities/device';

const type = deviceType();
let normalMarginTop = type === 'iOSx' ? -3 : 0;
let safeAreaMarginTop = type === 'iOSx' ? 45 : 20;

if (type === 'android') {
  normalMarginTop = 0;
  safeAreaMarginTop = 0;
}

export default () => ({
  common: {
    title: {
      fontFamily: fonts.family.contextSemiBold,
      fontSize: 24,
      flex: 1,
    },
    progressWrapper: {
      marginTop: 16,
    },
    whiteBackground: {
      backgroundColor: colors.light.white,
    },
    paddingLeft: {
      paddingLeft: 20,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: normalMarginTop,
      paddingRight: 20,
      paddingTop: 10,
    },
    main: {
      width: 50,
      height: 40,
    },
    safeArea: {
      marginTop: safeAreaMarginTop,
    },
  },
});
