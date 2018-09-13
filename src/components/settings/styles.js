import { StyleSheet } from 'react-native';
import { colors } from '../../constants/styleGuide';

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  group: {
    marginTop: 20,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grayScale5,
    paddingTop: 16,
    paddingBottom: 6,
  },
  itemTitle: {
    flexDirection: 'row',
    width: '100%',
    height: 36,
    paddingTop: 6,
    paddingBottom: 6,
  },
  itemName: {
    flex: 1,
    height: 24,
  },
  itemNameText: {
    color: colors.grayScale1,
  },
  itemIcon: {
    width: 26,
    height: 24,
    paddingRight: 2,
  },
  itemArrow: {
    width: 24,
    height: 24,
  },
};

export default StyleSheet.create(styles);
