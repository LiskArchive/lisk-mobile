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
    marginLeft: 20,
    marginRight: 20,
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
    paddingBottom: 15,
  },
  address: {
    fontSize: 24,
    paddingBottom: 15,
  },
  button: {
    borderRadius: 0,
    marginBottom: 0,
    marginTop: 20,
  },
  label: {
    color: '#86939e',
    marginTop: 15,
    marginBottom: 1,
  },
};

export default StyleSheet.create(styles);
