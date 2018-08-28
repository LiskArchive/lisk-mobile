import { StyleSheet } from 'react-native';
import { boxes, colors } from '../../../constants/styleGuide';


const styles = {
  container: {
    height: '100%',
  },
  innerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: boxes.white,
    paddingRight: boxes.boxPadding,
    paddingLeft: boxes.boxPadding,
    paddingTop: 37,
    paddingBottom: 35,
  },
  button: {
    marginTop: 20,
    backgroundColor: boxes.success1,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    paddingBottom: 80,
  },
  subtitle: {
    marginTop: 7,
    color: colors.grayScale2,
  },
  illustration: {
    width: '100%',
    height: 300,
    paddingBottom: 50,
  },
};

export default StyleSheet.create(styles);
