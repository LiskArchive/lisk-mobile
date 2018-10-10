import { StyleSheet } from 'react-native';
import { colors, fonts, boxes } from '../../constants/styleGuide';
import { deviceHeight } from '../../utilities/device';

const styles = {
  wrapper: {
    backgroundColor: colors.white,
    flex: 1,
  },
  container: {
    height: deviceHeight() - 200,
    top: 170,
  },
  innerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 36,
    paddingBottom: 20,
  },
  paddingBottom: {
    paddingBottom: 40,
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
  },
  connectionError: {
    color: colors.grayScale1,
    fontFamily: fonts.family.context,
    fontSize: fonts.size.input,
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
    textAlign: 'center',
    color: colors.grayScale2,
    fontSize: fonts.size.base,
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
    borderRightColor: 'transparent',
    color: 'black',
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
  linkWrapper: {
    width: '100%',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  question: {
    color: colors.grayScale2,
    textAlign: 'center',
  },
  link: {
    color: colors.primary5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fillWidth: {
    width: '100%',
  },
  splashContainer: {
    backgroundColor: colors.white,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 0,
    width: '100%',
    height: '100%',
  },
  splashBg: {
    backgroundColor: colors.primary9,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 0,
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  splashFigure: {
    height: 60,
    width: 153,
    left: '50%',
    marginLeft: -76,
    position: 'absolute',
  },
  splashStatic: {
    zIndex: 2,
    top: 100,
  },
  splashAnimating: {
    zIndex: 1,
    top: '50%',
    marginTop: -30,
  },
  splashImage: {
    height: 60,
    width: 153,
  },
  waves: {
    width: '100%',
    height: deviceHeight() - 280,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authTypeIcon: {

  },
};

export default StyleSheet.create(styles);
