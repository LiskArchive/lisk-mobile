import { StyleSheet } from 'react-native';
import { boxes, colors } from '../../../constants/styleGuide';

const styles = {
  container: {
    paddingVertical: boxes.boxPadding / 2,
  },
  text: {
    textAlign: 'center',
    color: colors.light.slateGray,
  },
};

export default StyleSheet.create(styles);
