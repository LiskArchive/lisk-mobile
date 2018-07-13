import { StyleSheet } from 'react-native';
import Colors from '../../constants/styleGuide/colors';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  divider: {
    margin: 20,
    marginBottom: 0,
    backgroundColor: '#ccc',
  },
  title: {
    paddingTop: 40,
  },
  address: {
    fontSize: 24,
    paddingBottom: 15,
  },
  value: {
    marginBottom: 20,
    alignItems: 'center',
    color: Colors.grayScale1,
  },
  label: {
    color: '#86939e',
    fontSize: 14,
    marginBottom: 7,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    paddingBottom: 0,
    marginRight: 20,
  },
  senderAndRecipient: {
    marginTop: 30,
  },
  row: {
    marginBottom: 30,
  },
  shareIcon: {
    marginLeft: 10,
  },
  transactionId: {
    marginBottom: 0,
  },
};

export default StyleSheet.create(styles);
