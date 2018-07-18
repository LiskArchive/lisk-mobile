import { StyleSheet } from 'react-native';
import styleGuide from '../../../constants/styleGuide';

const styles = {
  container: {
    height: '100%',
  },
  innerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 60,
    paddingBottom: 60,
  },
  button: {
    top: 20,
    marginRight: styleGuide.boxes.boxPadding,
    marginLeft: styleGuide.boxes.boxPadding,
  },
  errorMessage: {
    fontSize: 14,
    // height: 26,
  },
  subtitle: {
    color: styleGuide.colors.grayScale2,
  },
  input: {
    marginTop: 0,
  },
  titleContainer: {
    marginRight: styleGuide.boxes.boxPadding,
    marginLeft: styleGuide.boxes.boxPadding,
  },
};

export default StyleSheet.create(styles);
