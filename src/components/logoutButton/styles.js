import { StyleSheet } from 'react-native';
import { colors } from '../../constants/styleGuide';

const styles = {
  button: {
    width: '100%',
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 16,
    borderWidth: 0,
    paddingLeft: 0,
  },
  title: {
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
    color: colors.primary5,
  },
};

export default StyleSheet.create(styles);
