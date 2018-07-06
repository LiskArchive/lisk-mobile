import { StyleSheet } from 'react-native';
import styleGuide from '../../../constants/styleGuide';


const styles = {
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: '#ffffff',
    paddingRight: styleGuide.boxes.boxPadding,
    paddingLeft: styleGuide.boxes.boxPadding,
    paddingTop: 60,
    paddingBottom: 35,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#008722',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  gray: {
    color: '#666',
  },
  heading: {
    fontSize: 24,
    paddingBottom: 80,
  },
  subtitle: {
    color: styleGuide.colors.grayScale2,
  },
};

export default StyleSheet.create(styles);
