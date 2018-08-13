import { StyleSheet } from 'react-native';
import styleGuide from '../../constants/styleGuide';

const styles = {
  container: {
    backgroundColor: styleGuide.colors.white,
    flex: 1,
    alignContent: 'space-around',
  },
  scrollView: {
    marginTop: -10,
  },
  accountSummary: {
    zIndex: 2,
  },
};

export default StyleSheet.create(styles);
