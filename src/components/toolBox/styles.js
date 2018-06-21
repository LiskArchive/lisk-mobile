import { StyleSheet } from 'react-native';
import styleGuide from '../../constants/styleGuide';

const styles = {
  h1: {
    color: styleGuide.colors.black,
    fontSize: styleGuide.fontSizes.h1,
  },
  h2: {
    color: styleGuide.colors.black,
    fontSize: styleGuide.fontSizes.h2,
  },
  h3: {
    color: styleGuide.colors.black,
    fontSize: styleGuide.fontSizes.h3,
  },
  h4: {
    color: styleGuide.colors.black,
    fontSize: styleGuide.fontSizes.h4,
  },
  p: {
    fontSize: styleGuide.fontSizes.base,
  },
  span: {
    fontSize: styleGuide.fontSizes.base,
  },
  small: {
    fontSize: styleGuide.fontSizes.small,
  },
  a: {
    fontSize: styleGuide.fontSizes.base,
  },
  button: {
    fontSize: styleGuide.fontSizes.base,
    height: styleGuide.boxes.buttonHeight,
    lineHeight: styleGuide.boxes.buttonHeight,
    textAlign: 'center',
  },
  primaryButtonColor: {
    color: styleGuide.colors.white,
  },
  primaryButtonBg: {
    backgroundColor: styleGuide.colors.action4,
  },
  disabledButtonColor: {
    color: styleGuide.colors.grayScale4,
  },
  disabledButtonBg: {
    backgroundColor: styleGuide.colors.grayScale3,
  },
  labelButton: {
    backgroundColor: 'transparent',
    color: styleGuide.colors.white,
    fontSize: styleGuide.fontSizes.base,
  },
};

export default StyleSheet.create(styles);
