import { StyleSheet } from 'react-native';
import styleGuide from '../../constants/styleGuide';

const styles = {
  container: {
    paddingRight: 20,
    paddingLeft: 20,
  },
  itemContainer: {
    width: '100%',
    height: 80,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: styleGuide.colors.white,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderBottomColor: '#e3ebf2',
    borderBottomWidth: 1,
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

};

export default StyleSheet.create(styles);
