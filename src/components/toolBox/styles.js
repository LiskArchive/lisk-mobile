import { StyleSheet } from 'react-native';
import styleGuide from '../../constants/styleGuide';

const styles = {
  h1: {
    color: styleGuide.colors.black,
    fontSize: styleGuide.fontSizes.h1,
    fontWeight: 'bold',
  },
  h2: {
    color: styleGuide.colors.black,
    fontSize: styleGuide.fontSizes.h2,
    fontWeight: 'bold',
  },
  h3: {
    color: styleGuide.colors.black,
    fontSize: styleGuide.fontSizes.h3,
    fontWeight: 'bold',
  },
  h4: {
    color: styleGuide.colors.black,
    fontSize: styleGuide.fontSizes.h4,
    fontWeight: 'bold',
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
  primaryButton: {
    color: styleGuide.colors.white,
  },
  buttonWrapper: {
    borderRadius: 3,
  },
  disabledButtonColor: {
    color: styleGuide.colors.grayScale4,
  },
  disabledButtonBg: {
    backgroundColor: styleGuide.colors.grayScale3,
  },
  labelButton: {
    backgroundColor: 'transparent',
    color: styleGuide.colors.primary4,
    fontSize: styleGuide.fontSizes.base,
    borderWidth: 2,
    borderColor: styleGuide.colors.primary4,
  },
};

export default StyleSheet.create(styles);
