import { StyleSheet } from 'react-native';
import styleGuide from '../../../constants/styleGuide';

const styles = {
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 1,
    backgroundColor: '#ffffff',
  },
  button: {
    top: 20,
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
