import { StyleSheet } from 'react-native';
import styleGuide from '../../constants/styleGuide';

const styles = {
  title: {
    color: styleGuide.colors.black,
  },
  input: {
    color: styleGuide.colors.grayScale1,
  },
  button: {
    marginTop: 20,
    backgroundColor: styleGuide.colors.action4,
    marginRight: styleGuide.boxes.boxPadding,
    marginLeft: styleGuide.boxes.boxPadding,
  },
  errorMessage: {
    fontSize: 14,
    height: 26,
  },
};

export default StyleSheet.create(styles);
