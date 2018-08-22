import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../constants/styleGuide';

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  divider: {
    margin: 20,
    marginBottom: 0,
    backgroundColor: '#ccc',
  },
  title: {
    paddingTop: 15,
  },
  address: {
    fontSize: 24,
    paddingBottom: 15,
  },
  value: {
    marginBottom: 16,
    alignItems: 'center',
    color: colors.black,
    fontFamily: fonts.family.context,
  },
  label: {
    color: '#3C5068',
    fontSize: 13,
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
    marginTop: 24,
  },
  row: {
    marginBottom: 26,
  },
  shareIcon: {
    marginLeft: 10,
  },
  transactionId: {
    marginBottom: 0,
  },
};

export default StyleSheet.create(styles);
