import { StyleSheet } from 'react-native';
import styleGuide from '../../constants/styleGuide';

const styles = {
  wrapper: {
    backgroundColor: styleGuide.colors.white,
  },
  container: {
    height: '100%',
  },
  innerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: styleGuide.colors.white,
    paddingTop: 36,
    paddingBottom: 60,
  },
  subtitle: {
    marginTop: 7,
    color: styleGuide.colors.grayScale2,
  },
  headings: {
    marginRight: styleGuide.boxes.boxPadding,
    marginLeft: styleGuide.boxes.boxPadding,
  },
  main: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  address: {
    marginBottom: 15,
    color: '#263344',
  },
  share: {
    marginTop: 15,
  },
  fieldset: {
    height: 100,
  },
  blue: {
    color: styleGuide.colors.primary5,
  },
};

export default StyleSheet.create(styles);
