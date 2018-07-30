import { StyleSheet, Platform } from 'react-native';
import Colors from '../../constants/styleGuide/colors';

const styles = {
  container: {
    backgroundColor: Colors.white,
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
    color: Colors.grayScale2,
    paddingTop: 10,
    marginRight: 30,
    marginLeft: 30,
  },
  button: {
    marginTop: 20,
    marginRight: Platform.OS === 'ios' ? 10 : 30,
    marginLeft: Platform.OS === 'ios' ? 10 : 30,
  },
  logo: {
    width: 350,
    height: 380,
    paddingBottom: 0,
  },
};

export default StyleSheet.create(styles);
