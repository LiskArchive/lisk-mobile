import { StyleSheet } from 'react-native';
import { boxes, colors } from '../../constants/styleGuide';

const styles = {
  listItemEven: {
    backgroundColor: colors.grayScale5,
  },
  listItemOdd: {
    backgroundColor: colors.white,
  },
  itemTitle: {
    paddingLeft: boxes.elementPadding,
  },
  noBorder: {
    borderWidth: 0,
    marginTop: -1,
  },
};

export default StyleSheet.create(styles);
