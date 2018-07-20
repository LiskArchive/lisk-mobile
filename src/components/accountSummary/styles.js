import { StyleSheet, Dimensions, DeviceInfo, Platform } from 'react-native';
import { Header } from 'react-navigation';
import styleGuide from '../../constants/styleGuide';

const { width } = Dimensions.get('window');

export const consts = {
  width: Dimensions.get('window'),
  container: {
    expanded: 176,
    shrunk: 110,
    marginTop: 20,
  },
  bg: {
    expanded: 128,
    shrunk: 70,
  },
  box: {
    expanded: {
      height: 132,
      top: 40,
    },
    shrunk: {
      height: 100,
      top: 0,
    },
  },
  avatar: {
    expanded: {
      left: Math.floor(width / 2) - 40,
      top: 0,
    },
    shrunk: {
      left: 30,
      top: 10,
    },
  },
  address: {
    expanded: {
      top: 80,
      paddingLeft: 0,
    },
    shrunk: {
      top: 15,
      paddingLeft: 80,
    },
  },
  balance: {
    expanded: {
      top: 130,
      paddingLeft: 0,
    },
    shrunk: {
      top: 55,
      paddingLeft: 80,
    },
  },

};

const styles = {
  container: {
    width: '100%',
    height: consts.container.expanded,
    marginTop: consts.container.marginTop,
    flexDirection: 'column',
    justifyContent: 'center',
    borderBottomWidth: 20,
    borderBottomColor: 'transparent',
  },
  avatar: {
    height: 80,
    width: 80,
    top: 0,
    position: 'absolute',
    zIndex: 4,
    elevation: 4,
    shadowColor: styleGuide.colors.primary5,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    borderRadius: 40,
  },
  unit: {
    color: styleGuide.colors.primary5,
    fontSize: 23,
    lineHeight: 25,
  },
  value: {
    color: styleGuide.colors.primary5,
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
  addressP: {
    width: '100%',
    textAlign: 'center',
    lineHeight: 25,
  },
  balance: {
    height: 25,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
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
    width: width - (2 * styleGuide.boxes.boxPadding),
    shadowColor: styleGuide.colors.primary5,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    position: 'absolute',
    left: styleGuide.boxes.boxPadding,
    zIndex: 1,
    borderRadius: styleGuide.boxes.boxBorderRadius,
    backgroundColor: styleGuide.colors.white,
    elevation: 3,
  },
};

export default StyleSheet.create(styles);
