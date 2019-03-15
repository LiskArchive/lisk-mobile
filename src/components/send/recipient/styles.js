import { Platform } from 'react-native';
import { themes, colors, boxes, fonts } from '../../../constants/styleGuide';

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
      maxWidth: '100%',
    },
    subtitle: {
      marginTop: 0,
    },
    form: {
      paddingTop: boxes.boxPadding,
      paddingBottom: boxes.boxPadding,
    },
    input: {
      marginTop: 0,
      flexWrap: 'wrap',
      flex: 1,
    },
    scanButton: {
      position: 'absolute',
      zIndex: 99,
      top: 0,
      right: boxes.boxPadding + 5,
      width: 60,
    },
    scanButtonTitle: {
      fontSize: fonts.size.small,
      paddingLeft: 6,
    },
    longTitle: {
      right: boxes.boxPadding - 5,
      width: 90,
    },
    addressContainer: {
      width: '100%',
      paddingTop: 0,
    },
    addressInput: {
      ...Platform.select({
        android: {
          height: 48,
        },
        ios: {
          height: 48,
          paddingBottom: 10,
        },
      }),
    },
    addressInputWithAvatar: {
      paddingLeft: 40,
    },
    addressInputContainer: {
      paddingTop: 0,
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
      top: 22,
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
