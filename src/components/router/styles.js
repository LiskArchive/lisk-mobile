import { StyleSheet } from 'react-native';
import styleGuide from '../../constants/styleGuide';

const styles = {
  iconButton: {
    width: 60,
    height: 30,
    paddingLeft: styleGuide.boxes.elementPadding,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  iconButtonTitle: {
    color: styleGuide.colors.primary9,
    lineHeight: 18,
  },
};

export default StyleSheet.create(styles);
