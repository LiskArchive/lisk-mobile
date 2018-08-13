import { StyleSheet, Platform } from 'react-native';
import colors from '../../constants/styleGuide/colors';

const styles = {
  button: {
    paddingRight: 20,
    paddingTop: (Platform.OS === 'ios') ? 0 : 8,
    paddingBottom: 16,
    color: colors.white,
    borderWidth: 0,
    textAlign: 'right',
    fontWeight: '500',
  },
};

export default StyleSheet.create(styles);
