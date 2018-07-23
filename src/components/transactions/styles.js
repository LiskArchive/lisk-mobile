import { StyleSheet } from 'react-native';
import styleGuide from '../../constants/styleGuide';

const styles = {
  container: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 20,
  },
  itemContainer: {
    width: '100%',
    height: 100,
    paddingTop: 25,
    paddingBottom: 25,
    backgroundColor: styleGuide.colors.white,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderBottomColor: '#e3ebf2',
    borderBottomWidth: 1,
  },
  h1: {
    marginBottom: 0,
  },
  nativeList: {
    marginTop: 0,
    borderTopWidth: 0,
  },
  amountWrapper: {
    flex: 1,
  },
  amount: {
    paddingTop: 4,
    width: '100%',
    textAlign: 'right',
  },
  date: {
    color: styleGuide.colors.grayScale1,
  },
  address: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  avatar: {
    paddingRight: 15,
  },
  incoming: {
    color: styleGuide.colors.success1,
  },
  emptyState: {
    width: '100%',
    display: 'flex',
    flex: 1,
    backgroundColor: styleGuide.colors.white,
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
    color: styleGuide.colors.grayScale2,
  },
};

export default StyleSheet.create(styles);
