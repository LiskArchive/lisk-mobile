import { StyleSheet } from 'react-native';
import styleGuide from '../../constants/styleGuide';

const styles = {
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  container: {
    width: '100%',
  },
  button: {
    marginRight: styleGuide.boxes.boxPadding,
    marginLeft: styleGuide.boxes.boxPadding,
    marginTop: 30,
  },
};

export default StyleSheet.create(styles);
