import { StyleSheet, Platform } from 'react-native';
import { fonts, colors, boxes } from '../../../constants/styleGuide';
import { deviceType } from '../../../utilities/device';

const bottomOffset = deviceType() === 'iOSx' ? 30 : 0;

const styles = {
  h1: {
    color: colors.light.black,
    fontSize: fonts.size.h1,
    fontWeight: 'bold',
    fontFamily: fonts.family.heading,
  },
  h2: {
    color: colors.light.black,
    fontSize: fonts.size.h2,
    fontWeight: 'bold',
    fontFamily: fonts.family.heading,
  },
  h3: {
    color: colors.light.black,
    fontSize: fonts.size.h3,
    fontWeight: 'bold',
    fontFamily: fonts.family.heading,
  },
  h4: {
    color: colors.light.black,
    fontSize: fonts.size.h4,
    fontWeight: 'bold',
    fontFamily: fonts.family.heading,
  },
  p: {
    fontSize: fonts.size.base,
    fontFamily: fonts.family.context,
  },
  b: {
    fontSize: fonts.size.base,
    fontFamily: fonts.family.context,
    fontWeight: 'bold',
  },
  span: {
    fontSize: fonts.size.base,
    fontFamily: fonts.family.context,
  },
  small: {
    fontSize: fonts.size.small,
    fontFamily: fonts.family.context,
  },
  a: {
    fontSize: fonts.size.base,
    fontFamily: fonts.family.context,
  },
  footerButton: {
    width: '100%',
  },
  keyboardStickyButton: {
    borderRadius: 0,
    borderWidth: 0,
    borderTopWidth: 1,
    marginLeft: -1,
    marginRight: -1,
    height: 47,
  },
  pullUp: {
    ...Platform.select({
      android: {
        top: -20,
      },
      ios: {
        marginBottom: (20 + bottomOffset),
      },
    }),
  },
  overlay: {
    zIndex: 9999,
  },
  keyboard: {
    ...Platform.select({
      android: {
        backgroundColor: 'transparent',
        borderTopColor: 'transparent',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        borderRadius: 0,
      },
      ios: {
        backgroundColor: 'transparent',
        borderTopColor: 'transparent',
        height: 'auto',
        borderRadius: 0,
      },
    }),
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  scrollViewInnerContainer: {
    flex: 1,
  },
  footerButtonContainer: {
    width: '100%',
    position: 'absolute',
    padding: boxes.boxPadding,
    bottom: 0,
  },
  iPhoneXMargin: {
    marginBottom: 35,
  },
};

export default StyleSheet.create(styles);
