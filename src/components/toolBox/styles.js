import { StyleSheet } from 'react-native';
import { fonts, colors, fontSizes, boxes } from '../../constants/styleGuide';

const styles = {
  h1: {
    color: colors.black,
    fontSize: fontSizes.h1,
    fontWeight: 'bold',
    fontFamily: fonts.heading,
  },
  h2: {
    color: colors.black,
    fontSize: fontSizes.h2,
    fontWeight: 'bold',
    fontFamily: fonts.heading,
  },
  h3: {
    color: colors.black,
    fontSize: fontSizes.h3,
    fontWeight: 'bold',
    fontFamily: fonts.heading,
  },
  h4: {
    color: colors.black,
    fontSize: fontSizes.h4,
    fontWeight: 'bold',
    fontFamily: fonts.heading,
  },
  p: {
    fontSize: fontSizes.base,
    fontFamily: fonts.context,
  },
  span: {
    fontSize: fontSizes.base,
    fontFamily: fonts.context,
  },
  small: {
    fontSize: fontSizes.small,
    fontFamily: fonts.context,
  },
  a: {
    fontSize: fontSizes.base,
    fontFamily: fonts.context,
  },
  button: {
    fontSize: fontSizes.base,
    fontFamily: fonts.context,
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
    fontSize: fontSizes.base,
    borderWidth: 2,
    borderColor: colors.primary4,
    fontFamily: fonts.context,
  },
  inputLabel: {
    color: colors.grayScale1,
    fontFamily: fonts.contextLight,
    fontSize: fontSizes.input,
    fontWeight: '400',
  },
  inputText: {
    fontWeight: 'bold',
    color: colors.black,
    fontSize: fontSizes.input,
    fontFamily: fonts.contextSemiBold,
    lineHeight: 30,
    minHeight: 30,
  },
  input: {
    borderBottomColor: colors.grayScale1,
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
    fontFamily: fonts.context,
    marginBottom: 20,
    paddingTop: 0,
    marginLeft: 5,
    marginRight: 0,
    marginTop: 0,
    fontSize: fontSizes.input,
  },
  errorIcon: {
    color: colors.action1,
  },
  inputErrorStyle: {
    borderBottomColor: colors.action1,
  },
};

export default StyleSheet.create(styles);
