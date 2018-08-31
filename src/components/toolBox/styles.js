import { StyleSheet } from 'react-native';
import { fonts, colors, boxes } from '../../constants/styleGuide';

const styles = {
  h1: {
    color: colors.black,
    fontSize: fonts.size.h1,
    fontWeight: 'bold',
    fontFamily: fonts.family.heading,
  },
  h2: {
    color: colors.black,
    fontSize: fonts.size.h2,
    fontWeight: 'bold',
    fontFamily: fonts.family.heading,
  },
  h3: {
    color: colors.black,
    fontSize: fonts.size.h3,
    fontWeight: 'bold',
    fontFamily: fonts.family.heading,
  },
  h4: {
    color: colors.black,
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
  button: {
    fontSize: fonts.size.base,
    fontFamily: fonts.family.context,
    textAlign: 'center',
  },
  primaryButton: {
    color: colors.white,
    lineHeight: boxes.buttonHeight,
  },
  buttonWrapper: {
    borderRadius: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  iconButton: {
    width: 40,
    height: 30,
    paddingLeft: boxes.elementPadding,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  iconButtonTitle: {
    color: colors.primary9,
    lineHeight: 18,
  },
  disabledButtonColor: {
    color: colors.grayScale3,
  },
  disabledButtonBg: {
    backgroundColor: colors.white,
    borderColor: colors.grayScale3,
    borderWidth: 2,
  },
  labelButton: {
    backgroundColor: 'transparent',
    color: colors.primary4,
    fontSize: fonts.size.base,
    borderWidth: 2,
    borderColor: colors.primary4,
    fontFamily: fonts.family.context,
  },
  inputLabel: {
    color: colors.grayScale1,
    fontFamily: fonts.family.contextLight,
    fontSize: fonts.size.input,
    fontWeight: '400',
  },
  input: {
    fontWeight: 'bold',
    color: colors.black,
    fontSize: fonts.size.input,
    fontFamily: fonts.family.contextSemiBold,
    lineHeight: 30,
    minHeight: 30,
  },
  inputContainer: {
    // borderBottomColor: colors.grayScale1,
    borderBottomColor: 'green',
    paddingBottom: 5,
  },
  errorMessageContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: 20,
    paddingRight: 20,
  },
  errorMessage: {
    color: colors.grayScale1,
    fontFamily: fonts.family.context,
    marginBottom: 20,
    paddingTop: 0,
    marginLeft: 5,
    marginRight: 0,
    marginTop: 0,
    fontSize: fonts.size.input,
  },
  errorIcon: {
    color: colors.action1,
  },
  inputErrorStyle: {
    borderBottomColor: colors.action1,
  },
};

export default StyleSheet.create(styles);
