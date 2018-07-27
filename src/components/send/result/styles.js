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
    paddingTop: 37,
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
    marginTop: 7,
    color: styleGuide.colors.grayScale2,
  },
  illustration: {
    width: '100%',
    height: 300,
    paddingBottom: 50,
  },
};

export default StyleSheet.create(styles);
