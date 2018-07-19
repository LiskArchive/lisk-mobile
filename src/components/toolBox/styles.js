import { StyleSheet } from 'react-native';
import styleGuide from '../../constants/styleGuide';

const styles = {
  h1: {
    color: styleGuide.colors.black,
    fontSize: styleGuide.fontSizes.h1,
    fontWeight: 'bold',
    fontFamily: styleGuide.fonts.heading,
  },
  h2: {
    color: styleGuide.colors.black,
    fontSize: styleGuide.fontSizes.h2,
    fontWeight: 'bold',
    fontFamily: styleGuide.fonts.heading,
  },
  h3: {
    color: styleGuide.colors.black,
    fontSize: styleGuide.fontSizes.h3,
    fontWeight: 'bold',
    fontFamily: styleGuide.fonts.heading,
  },
  h4: {
    color: styleGuide.colors.black,
    fontSize: styleGuide.fontSizes.h4,
    fontWeight: 'bold',
    fontFamily: styleGuide.fonts.heading,
  },
  p: {
    fontSize: styleGuide.fontSizes.base,
    fontFamily: styleGuide.fonts.context,
  },
  span: {
    fontSize: styleGuide.fontSizes.base,
    fontFamily: styleGuide.fonts.context,
  },
  small: {
    fontSize: styleGuide.fontSizes.small,
    fontFamily: styleGuide.fonts.context,
  },
  a: {
    fontSize: styleGuide.fontSizes.base,
    fontFamily: styleGuide.fonts.context,
  },
  button: {
    fontSize: styleGuide.fontSizes.base,
    height: styleGuide.boxes.buttonHeight,
    lineHeight: styleGuide.boxes.buttonHeight,
    fontFamily: styleGuide.fonts.context,
    textAlign: 'center',
  },
  primaryButton: {
    color: styleGuide.colors.white,
  },
  buttonWrapper: {
    borderRadius: 3,
  },
  disabledButtonColor: {
    color: styleGuide.colors.grayScale3,
  },
  disabledButtonBg: {
    borderRadius: 3,
    backgroundColor: styleGuide.colors.white,
    borderWidth: 2,
    borderColor: styleGuide.colors.grayScale3,
  },
  labelButton: {
    backgroundColor: 'transparent',
    color: styleGuide.colors.primary4,
    fontSize: styleGuide.fontSizes.base,
    borderWidth: 2,
    borderColor: styleGuide.colors.primary4,
    fontFamily: styleGuide.fonts.context,
  },
  inputLabel: {
    color: styleGuide.colors.grayScale1,
    fontFamily: styleGuide.fonts.contextLight,
    fontSize: styleGuide.fontSizes.input,
    fontWeight: '400',
  },
  inputText: {
    fontWeight: 'bold',
    color: styleGuide.colors.black,
    fontFamily: styleGuide.fonts.contextSemiBold,
  },
  input: {
    borderBottomColor: styleGuide.colors.grayScale1,
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
    color: styleGuide.colors.grayScale1,
    fontFamily: styleGuide.fonts.context,
    marginBottom: 20,
    paddingTop: 0,
    marginLeft: 5,
    marginRight: 0,
    marginTop: 0,
    fontSize: styleGuide.fontSizes.input,
  },
  errorIcon: {
    color: styleGuide.colors.action1,
  },
};

export default StyleSheet.create(styles);
