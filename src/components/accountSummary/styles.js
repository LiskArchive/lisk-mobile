import { StyleSheet, Dimensions, DeviceInfo, Platform } from 'react-native';
import { Header } from 'react-navigation';
import { colors, boxes } from '../../constants/styleGuide';

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
    top: [130, 55],
    left: [33, 110],
  },
};

const styles = {
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
    shadowColor: colors.primary5,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    borderRadius: 40,
    overflow: 'hidden',
  },
  unit: {
    color: colors.primary5,
    fontSize: 23,
    lineHeight: 25,
    marginLeft: 5,
    marginTop: -3,
  },
  value: {
    color: colors.primary5,
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
    color: colors.grayScale1,
  },
  balance: {
    height: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    zIndex: 4,
    elevation: 4,
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
    shadowColor: colors.primary5,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    position: 'absolute',
    left: boxes.boxPadding,
    zIndex: 1,
    borderRadius: boxes.boxBorderRadius,
    backgroundColor: colors.white,
    elevation: 3,
  },
};

export default StyleSheet.create(styles);
