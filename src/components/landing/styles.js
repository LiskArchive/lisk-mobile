import { StyleSheet } from 'react-native';

const styles = {
  container: {
    backgroundColor: '#fff',
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
    width: 350,
    height: 300,
    // backgroundColor: '#f0f',
  },
};

export default StyleSheet.create(styles);
