import { StyleSheet } from 'react-native';
import { colors } from '../../constants/styleGuide';

const styles = {
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  bg: {
    backgroundColor: colors.primary9,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 0,
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  figure: {
    height: 60,
    width: 153,
    left: '50%',
    marginLeft: -76,
    position: 'absolute',
  },
  static: {
    zIndex: 2,
    top: 100,
  },
  animating: {
    zIndex: 1,
    top: '50%',
    marginTop: -30,
  },
  image: {
    height: 60,
    width: 153,
  },
};

export default StyleSheet.create(styles);
