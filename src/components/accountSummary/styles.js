import { Dimensions, DeviceInfo, Platform } from 'react-native';
import { Header } from 'react-navigation';
import { themes, colors, boxes } from '../../constants/styleGuide';

const { width } = Dimensions.get('window');

export const animationRanges = {
  width,
  container: {
    marginTop: 6,
    height: [185, 110],
  },
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
      height: animationRanges.container.height[0],
      marginTop: animationRanges.container.marginTop,
      borderBottomWidth: 20,
      borderBottomColor: 'transparent',
    },
    avatar: {
      top: 0,
      position: 'absolute',
      zIndex: 4,
      elevation: 4,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      borderRadius: 40,
      overflow: 'hidden',
    },
    unit: {
      fontSize: 23,
      lineHeight: 25,
      marginLeft: 5,
      marginTop: -3,
    },
    value: {
      lineHeight: 25,
    },
    address: {
      height: 45,
      paddingTop: 10,
      paddingBottom: 10,
      position: 'absolute',
      zIndex: 4,
      elevation: 4,
    },
    addressContainer: {
      justifyContent: 'center',
    },
    addressP: {
      lineHeight: 25,
    },
    balance: {
      height: 45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-end',
      position: 'absolute',
      zIndex: 4,
      elevation: 4,
    },
    lift: {
      marginTop: -10,
    },
    bg: {
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 0,
      width: '100%',
      overflow: 'hidden',
    },
    bgImage: {
      position: 'absolute',
      width: '100%',
      left: 0,
      top: (Platform.OS === 'ios' && DeviceInfo.isIPhoneX_deprecated) ?
        -1 * (Header.HEIGHT + 24) : -1 * (Header.HEIGHT + 1),
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
    avatar: {
      shadowColor: colors.light.blue,
    },
    unit: {
      color: colors.light.blue,
    },
    value: {
      color: colors.light.blue,
    },
    addressP: {
      color: colors.light.gray1,
    },
    box: {
      shadowColor: colors.light.blue,
      backgroundColor: colors.light.white,
    },
  },
  [themes.dark]: {
    addressP: {
      color: colors.dark.gray2,
    },
    value: {
      color: colors.dark.white,
    },
    unit: {
      color: colors.dark.white,
    },
    box: {
      shadowColor: colors.light.black,
      backgroundColor: colors.dark.tabBarBg,
    },
  },
});
