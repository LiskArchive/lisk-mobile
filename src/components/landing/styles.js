import { StyleSheet } from 'react-native';

const styles = {
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
  },
  textContainer: {
    flex: 1,
  },
  header: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    color: '#74869B',
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
    width: 250,
    height: 400,
  },
};

export default StyleSheet.create(styles);
