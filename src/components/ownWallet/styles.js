import { StyleSheet } from 'react-native';
import styleGuide from '../../constants/styleGuide';

const styles = {
  container: {
    backgroundColor: styleGuide.colors.white,
    paddingBottom: 70,
    flex: 1,
    alignContent: 'space-around',
  },
  scrollView: {
    marginTop: -70,
    paddingTop: 70,
  },
  accountSummary: {
    zIndex: 2,
  },
};

export default StyleSheet.create(styles);
