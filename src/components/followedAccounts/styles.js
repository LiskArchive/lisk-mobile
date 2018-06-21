import { StyleSheet } from 'react-native';
import styleGuide from '../../constants/styleGuide';

const styles = {
  listItemEven: {
    backgroundColor: '#eff4f9',
  },
  listItemOdd: {
    backgroundColor: '#fff',
  },
  itemTitle: {
    paddingLeft: styleGuide.boxes.elementPadding,
  },
  noBorder: {
    borderWidth: 0,
    marginTop: -1,
  },
};

export default StyleSheet.create(styles);
