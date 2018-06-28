import { StyleSheet } from 'react-native';

const styles = {
  container: {
    backgroundColor: '#fff',
    width: '94%',
    marginTop: 10,
    marginBottom: 10,
    marginRight: '3%',
    marginLeft: '3%',
    padding: 20,
  },
  balance: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  unit: {
    fontSize: 16,
    color: '#000',
  },
  value: {
    fontSize: 28,
    color: '#000',
  },
  address: {
    fontSize: 20,
    color: '#ff6236',
    textAlign: 'center',
    marginBottom: 20,
    width: '100%',
  },
  title: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
};

export default StyleSheet.create(styles);
