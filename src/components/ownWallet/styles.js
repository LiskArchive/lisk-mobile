import { StyleSheet } from 'react-native';
import { colors } from '../../constants/styleGuide';

const styles = {
  container: {
    flex: 1,
    alignContent: 'space-around',
    backgroundColor: colors.white,
  },
  scrollView: {
    marginTop: -10,
  },
  accountSummary: {
    zIndex: 2,
  },
};

export default StyleSheet.create(styles);
