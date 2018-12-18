import { Platform } from 'react-native';
import { themes, colors, boxes, fonts } from '../../constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      flex: 1,
    },
    innerContainer: {
      flexDirection: 'column',
      flex: 1,
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
      right: 10,
      zIndex: 99,
      top: 47,
      paddingRight: 15,
      paddingLeft: 10,
      paddingBottom: 10,
      width: 80,
      height: 30,
    },
    scanButtonTitle: {
      fontSize: 14,
      width: 39,
      paddingLeft: 5,
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
    address: {
      fontWeight: 'bold',
      marginLeft: 10,
    },
    staticAddressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    staticAvatar: {
      paddingBottom: 0,
    },
    row: {
      marginTop: 25,
      marginBottom: 5,
      marginRight: boxes.boxPadding,
      marginLeft: boxes.boxPadding,
    },
    label: {
      marginTop: 5,
      marginBottom: 7,
      color: colors.light.gray1,
      fontFamily: fonts.family.contextLight,
      fontSize: fonts.size.input,
      fontWeight: '400',
    },
  },
  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
    scanButtonTitle: {
      color: colors.light.blue,
    },
    label: {
      color: colors.light.gray1,
    },
    address: {
      color: colors.light.black,
    },
  },
  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.screenBgNavy,
    },
    scanButtonTitle: {
      color: colors.dark.blue,
    },
    label: {
      color: colors.dark.gray4,
    },
    address: {
      color: colors.dark.white,
    },
  },
});
