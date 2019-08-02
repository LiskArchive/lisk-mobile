import { Platform } from 'react-native';
import { themes, colors, boxes, fonts } from '../../../../../constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      flex: 1,
    },
    innerContainer: {
      flexDirection: 'column',
      paddingBottom: 24,
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
      top: -5,
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
      marginBottom: 20,
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
      paddingLeft: 48.5,
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
      left: 32.5,
      top: 43,
    },
  },
  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
    scanButtonTitle: {
      color: colors.light.maastrichtBlue,
    },
    inputLabel: {
      color: colors.light.maastrichtBlue,
    },
  },
  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.maastrichtBlue,
    },
    scanButtonTitle: {
      color: colors.light.platinum,
    },
    inputLabel: {
      color: colors.light.platinum,
    },
  },
});
