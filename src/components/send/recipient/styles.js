import { Platform } from 'react-native';
import { themes, colors, boxes } from '../../../constants/styleGuide';

export default () => ({
  common: {
    innerContainer: {
      flexDirection: 'column',
      paddingBottom: 24,
    },
    titleContainer: {
      overflow: 'hidden',
      marginRight: boxes.boxPadding,
      marginLeft: boxes.boxPadding,
      paddingTop: 0,
    },
    subtitle: {
      maxWidth: '100%',
      height: 40,
      marginTop: 0,
    },
    form: {
      paddingBottom: boxes.boxPadding,
    },
    input: {
      marginTop: 0,
      flexWrap: 'wrap',
      flex: 1,
    },
    scanButton: {
      position: 'absolute',
      right: 20,
      zIndex: 99,
      top: 47,
      paddingRight: 15,
      paddingBottom: 10,
      width: 67,
      height: 30,
    },
    scanButtonTitle: {
      fontSize: 14,
      paddingLeft: 5,
    },
    longTitle: {
      width: 87,
    },
    addressContainer: {
      width: '100%',
    },
    addressInput: {
      ...Platform.select({
        android: {
          height: 48,
          paddingLeft: 40,
        },
        ios: {
          height: 48,
          paddingBottom: 10,
          paddingLeft: 40,
        },
      }),
    },
    addressInputContainer: {
      ...Platform.select({
        android: {
          minHeight: 58,
        },
        ios: {
          minHeight: 48,
        },
      }),
    },
    avatar: {
      position: 'absolute',
      zIndex: 0,
      left: 20,
      top: 41,
    },
  },
  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
    subtitle: {
      color: colors.light.gray2,
    },
    scanButtonTitle: {
      color: colors.light.blue,
    },
  },
  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.screenBgNavy,
    },
    subtitle: {
      color: colors.dark.gray4,
    },
    scanButtonTitle: {
      color: colors.dark.blue,
    },
  },
});
