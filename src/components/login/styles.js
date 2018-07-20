import { StyleSheet } from 'react-native';
import styleGuide from '../../constants/styleGuide';

const styles = {
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    width: '100%',
    flexDirection: 'column',
    marginTop: 60,
  },
  button: {
    marginRight: styleGuide.boxes.boxPadding,
    marginLeft: styleGuide.boxes.boxPadding,
    marginBottom: 60,
  },
  errorMessage: {
    fontSize: 14,
    height: 42,
  },
};

export default StyleSheet.create(styles);
