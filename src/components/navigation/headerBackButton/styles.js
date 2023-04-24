import { colors, fonts, boxes } from 'constants/styleGuide';
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
      fontSize: 22,
    },
    titleContainer: {
      flex: 1,
      minHeight: 40,
    },
    mainContainer: {
      paddingLeft: boxes.boxPadding,
      paddingRight: boxes.boxPadding,
      marginBottom: boxes.boxPadding,
      marginTop: normalMarginTop,
      paddingTop: 10,
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
      justifyContent: 'space-between',
    },
    main: {
      width: 50,
      height: 40,
      marginLeft: -20,
    },
    safeArea: {
      marginTop: safeAreaMarginTop,
    },
  },
});
