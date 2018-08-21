import { StyleSheet } from 'react-native';
import { colors, boxes } from '../../constants/styleGuide';

const styles = {
  title: {
    color: colors.black,
  },
  input: {
    color: colors.grayScale1,
  },
  button: {
    marginTop: 20,
    backgroundColor: colors.action4,
    marginRight: boxes.boxPadding,
    marginLeft: boxes.boxPadding,
  },
  errorMessage: {
    fontSize: 14,
    height: 26,
  },
};

export default StyleSheet.create(styles);
