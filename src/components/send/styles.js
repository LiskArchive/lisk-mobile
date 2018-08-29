import { StyleSheet, Platform } from 'react-native';
import { colors } from '../../constants/styleGuide';

const styles = {
  back: {
    width: 60,
    height: 40,
    marginTop: (Platform.OS === 'ios') ? 0 : 6,
  },
  wrapper: {
    backgroundColor: colors.white,
    height: '100%',
  },
  multiStepWrapper: {
    height: '100%',
  },
};

export default StyleSheet.create(styles);
