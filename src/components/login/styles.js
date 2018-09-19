import { StyleSheet } from 'react-native';
import { colors, fonts, boxes } from '../../constants/styleGuide';

const styles = {
  wrapper: {
    backgroundColor: colors.white,
    flex: 1,
  },
  container: {
    height: '100%',
  },
  innerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 36,
    paddingBottom: 20,
  },
  titleContainer: {
    paddingTop: 35,
  },
  placeholder: {
    width: '100%',
    height: 20,
  },
  connectionErrorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 20,
    paddingRight: 20,
    opacity: 0,
    paddingBottom: 10,
    marginBottom: -30,
    backgroundColor: colors.white,
    elevation: 2,
    zIndex: 2,
  },
  connectionError: {
    color: colors.grayScale1,
    fontFamily: fonts.family.context,
    fontSize: fonts.size.small,
  },
  connectionErrorIcon: {
    color: colors.action1,
    marginRight: 5,
  },
  visible: {
    opacity: 1,
  },
  title: {
    paddingLeft: boxes.boxPadding,
    paddingRight: boxes.boxPadding,
  },
  button: {
    marginRight: boxes.boxPadding,
    marginLeft: boxes.boxPadding,
    marginBottom: 60,
  },
  errorMessage: {
    fontSize: 14,
    height: 42,
  },
  input: {
    paddingRight: boxes.boxPadding,
    borderRightWidth: boxes.boxPadding,
    borderRightColor: 'transparent',
    color: 'black',
    fontSize: 13,
    letterSpacing: 1,
    fontFamily: fonts.family.passphrase,
  },
  allWhite: {
    borderTopColor: colors.white,
    backgroundColor: colors.white,
  },
  sticky: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  buttonSticky: {
    borderRadius: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  registerLinkWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  registerQuestion: {
    color: colors.grayScale2,
  },
  registerLink: {
    color: colors.primary5,
    fontWeight: 'bold',
  },
};

export default StyleSheet.create(styles);
