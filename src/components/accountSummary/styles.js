import { StyleSheet, Dimensions, DeviceInfo } from 'react-native';
import { Header } from 'react-navigation';
import styleGuide from '../../constants/styleGuide';

const { width } = Dimensions.get('window');
const profileMarginTop = 50;
const profileExpandedHeight = 130;
const styles = {
  container: {
    backgroundColor: styleGuide.colors.white,
    width: width - (2 * styleGuide.boxes.boxPadding),
    height: profileExpandedHeight,
    marginTop: profileMarginTop,
    marginBottom: 10,
    marginRight: styleGuide.boxes.boxPadding,
    marginLeft: styleGuide.boxes.boxPadding,
    padding: styleGuide.boxes.boxPadding,
    borderRadius: styleGuide.boxes.boxBorderRadius,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  profileShadow: {
    shadowColor: styleGuide.colors.primary5,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  avatar: {
    marginTop: -60,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-end',
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
    width: '100%',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 15,
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
    height: profileMarginTop + (profileExpandedHeight / 2),
    overflow: 'hidden',
  },
  bgImage: {
    position: 'absolute',
    left: 0,
    top: DeviceInfo.isIPhoneX_deprecated ? -1 * (Header.HEIGHT + 24) : -1 * (Header.HEIGHT + 1),
  },
};

export default StyleSheet.create(styles);
