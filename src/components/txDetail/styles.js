import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../constants/styleGuide';

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.light.white,
    paddingTop: 0,
    paddingBottom: 20,
  },
  divider: {
    margin: 20,
    marginBottom: 0,
    backgroundColor: '#ccc',
  },
  title: {
    paddingTop: 35,
    paddingLeft: 20,
    paddingRight: 20,
  },
  address: {
    fontSize: 24,
    paddingBottom: 15,
  },
  date: {
    alignItems: 'center',
    color: colors.light.gray2,
    fontFamily: fonts.family.context,
    marginTop: 5,
  },
  value: {
    alignItems: 'center',
    color: colors.light.black,
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
  arrow: {
    marginRight: 20,
    marginLeft: 20,
    width: 99,
    height: 16,
  },
  reverseArrow: {
    transform: [
      { rotateY: '180deg' },
    ],
  },
  senderAndRecipient: {
    marginTop: 24,
    marginBottom: 10,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F8FCFF',
    borderBottomWidth: 1,
    borderBottomColor: colors.light.gray5,
    borderTopWidth: 1,
    borderTopColor: colors.light.gray5,
  },
  row: {
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  incoming: {
    color: colors.light.green,
  },
  shareIcon: {
    marginLeft: 10,
  },
  transactionId: {
    marginBottom: 0,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.gray5,
    marginLeft: 20,
    marginRight: 20,
  },
  rowIcon: {
    marginRight: 11,
  },
};

export default StyleSheet.create(styles);
