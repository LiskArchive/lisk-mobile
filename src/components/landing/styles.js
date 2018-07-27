import { StyleSheet } from 'react-native';
import Colors from '../../constants/styleGuide/colors';

const styles = {
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    alignContent: 'space-around',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  textContainer: {
    alignItems: 'center',
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
    marginRight: 10,
    marginLeft: 10,
  },
  logo: {
    width: 350,
    height: 300,
  },
};

export default StyleSheet.create(styles);
