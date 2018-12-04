import { Dimensions, DeviceInfo, Platform } from 'react-native';
import { Header } from 'react-navigation';
import { themes, colors, boxes } from '../../constants/styleGuide';

const { width } = Dimensions.get('window');

export const animationRanges = {
  width,
  bg: {
    height: [116, 56],
  },
  box: {
    height: [125, 100],
    top: [50, 0],
  },
  avatar: {
    left: [Math.floor(width / 2) - 40, 40, 40],
    top: [0, 0, 20],
    width: [80, 70, 60],
    height: [80, 70, 60],
  },
  address: {
    top: [83, 15],
    left: [33, 110],
  },
  balance: {
    top: [120, 45],
    left: [33, 110],
  },
};

export default () => ({
  common: {
    container: {
      width: '100%',
      height: 160,
      backgroundColor: colors.dark.screenBgNavy,
      overflow: 'hidden',
    },
    avatar: {
      top: 0,
      left: '50%',
      marginLeft: -30,
      position: 'absolute',
      zIndex: 4,
      elevation: 4,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      borderRadius: 30,
      overflow: 'hidden',
    },
    address: {
      width: '100%',
      paddingTop: 10,
      paddingBottom: 3,
      marginTop: 60,
      textAlign: 'center',
      zIndex: 2,
    },
    addressContainer: {
      justifyContent: 'center',
    },
    addressP: {
      lineHeight: 25,
    },
    balance: {
      height: 32,
      width: '100%',
      alignItems: 'center',
      zIndex: 2,
      elevation: 2,
    },
    lift: {
      marginTop: -10,
    },
    bg: {
      position: 'absolute',
      left: 0,
      top: (Platform.OS === 'ios' && DeviceInfo.isIPhoneX_deprecated) ?
        -1 * (Header.HEIGHT + 24) : -1 * (Header.HEIGHT + 1),
      zIndex: 1,
      height: 280,
      width: '100%',
      overflow: 'hidden',
    },
    box: {
      width: width - (2 * boxes.boxPadding),
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      position: 'absolute',
      left: boxes.boxPadding,
      zIndex: 1,
      borderRadius: boxes.boxBorderRadius,
      elevation: 3,
    },
    blurWrapper: {
      backgroundColor: 'red',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      height: 45,
    },
    blur: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      marginTop: -30,
      zIndex: 2,
      opacity: 0,
    },
    visibleBlur: {
      opacity: 1,
    },
    invisibleTitle: {
      color: 'rgba(255, 255, 255, 0.02)',
    },
    blurBig: {
      width: 150,
      height: 45,
      marginLeft: -75,
    },
    blurMedium: {
      width: 116,
      height: 45,
      marginLeft: -58,
    },
    blurSmall: {
      width: 91,
      height: 45,
      marginLeft: -45,
    },
  },
  [themes.light]: {
    bg: {
      opacity: 1,
    },
    avatar: {
      shadowColor: colors.light.blue,
    },
    balance: {
      color: colors.light.white,
    },
    addressP: {
      color: colors.light.gray5,
    },
    box: {
      shadowColor: colors.light.blue,
      backgroundColor: colors.light.white,
    },
  },
  [themes.dark]: {
    bg: {
      opacity: 0.6,
    },
    addressP: {
      color: colors.dark.gray2,
    },
    balance: {
      color: colors.dark.white,
    },
    box: {
      shadowColor: colors.light.black,
      backgroundColor: colors.dark.navigationBg,
    },
  },
});
