import { StyleSheet } from 'react-native';

const styles = {
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 1,
    backgroundColor: '#ffffff',
  },
  verticalAligner: {
    padding: 20,
  },
  centerAlign: {
    textAlign: 'center',
  },
  leftAlign: {
    textAlign: 'left',
  },
  gray: {
    color: '#666',
  },
  black: {
    color: '#000',
  },
  heading: {
    fontSize: 24,
    paddingBottom: 80,
  },
  row: {
  },
  title: {
    fontSize: 12,
    paddingBottom: 10,
  },
  amount: {
    fontSize: 24,
    paddingBottom: 15,
  },
  address: {
    fontSize: 24,
    paddingBottom: 15,
  },
  button: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    marginTop: 20,
  },
};

export default StyleSheet.create(styles);
