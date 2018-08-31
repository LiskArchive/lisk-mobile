import { StyleSheet } from 'react-native';
import { colors } from '../../constants/styleGuide';

const styles = {
  container: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 20,
  },
  itemContainer: {
    width: '100%',
    height: 90,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderBottomColor: colors.grayScale5,
    borderBottomWidth: 1,
  },
  title: {
    marginBottom: 15,
  },
  nativeList: {
    marginTop: 0,
    borderTopWidth: 0,
  },
  amountWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  amount: {
    paddingTop: 4,
    width: '100%',
    textAlign: 'right',
  },
  date: {
    color: colors.grayScale1,
  },
  address: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  avatar: {
    paddingRight: 15,
  },
  incoming: {
    color: colors.success1,
  },
  emptyState: {
    width: '100%',
    display: 'flex',
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  noActivity: {
    width: 178,
    height: 199,
  },
  noTxTitle: {
    paddingTop: 10,
    color: colors.grayScale2,
  },
  pendingIcon: {
    width: 18,
    height: 18,
  },
  initText: {
    marginLeft: 7,
    marginBottom: 22,
  },
  link: {
    marginLeft: 5,
    color: colors.primary6,
  },
};

export default StyleSheet.create(styles);
