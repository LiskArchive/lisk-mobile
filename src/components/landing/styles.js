import { StyleSheet, Platform, Dimensions } from 'react-native';
import { colors } from '../../constants/styleGuide';

const { height } = Dimensions.get('window');

const styles = {
  container: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  textContainer: {
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 0,
    paddingBottom: 0,
  },
  header: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    color: colors.grayScale2,
    paddingTop: 10,
    marginRight: 20,
    marginLeft: 20,
  },
  button: {
    marginTop: 20,
    marginRight: Platform.OS === 'ios' ? 10 : 30,
    marginLeft: Platform.OS === 'ios' ? 10 : 30,
  },
  logo: {
    width: 460,
    height: height < 640 ? 310 : 460,
    paddingBottom: 0,
    top: -25,
  },
};

export default StyleSheet.create(styles);
