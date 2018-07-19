import { StyleSheet, Dimensions, DeviceInfo, Platform } from 'react-native';
import { Header } from 'react-navigation';
import styleGuide from '../../constants/styleGuide';

const { width } = Dimensions.get('window');
const profileMarginTop = 20;
const profileExpandedHeight = 166;
const styles = {
  container: {
    width: '100%',
    height: profileExpandedHeight,
    marginTop: profileMarginTop,
    flexDirection: 'column',
    justifyContent: 'center',
    borderBottomWidth: 20,
    borderBottomColor: 'transparent',
  },
  avatar: {
    height: 80,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    paddingRight: styleGuide.boxes.boxPadding,
    paddingLeft: styleGuide.boxes.boxPadding,
    zIndex: 4,
    elevation: 4,
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
  },
  addressP: {
    width: '100%',
    textAlign: 'center',
    lineHeight: 25,
  },
  balance: {
    height: 25,
  },
  title: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  bg: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 0,
    width: '100%',
    height: profileMarginTop + (profileExpandedHeight / 2) + 20,
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
    height: profileExpandedHeight - 44,
    shadowColor: styleGuide.colors.primary5,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    position: 'absolute',
    top: 40,
    left: styleGuide.boxes.boxPadding,
    zIndex: 1,
    borderRadius: styleGuide.boxes.boxBorderRadius,
    backgroundColor: styleGuide.colors.white,
    elevation: 3,
  },
};

export default StyleSheet.create(styles);
