import { StyleSheet } from 'react-native';
import styleGuide from '../../constants/styleGuide';

const styles = {
  wrapper: {
    backgroundColor: styleGuide.colors.white,
    flex: 1,
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
  titleContainer: {
    paddingTop: 35,
  },
  placeholder: {
    width: '100%',
    height: 2,
  },
  title: {
    paddingLeft: styleGuide.boxes.boxPadding,
    paddingRight: styleGuide.boxes.boxPadding,
  },
  button: {
    marginRight: styleGuide.boxes.boxPadding,
    marginLeft: styleGuide.boxes.boxPadding,
    marginBottom: 60,
  },
  errorMessage: {
    fontSize: 14,
    height: 42,
  },
  input: {
    paddingRight: styleGuide.boxes.boxPadding,
    borderRightWidth: styleGuide.boxes.boxPadding,
    borderRightColor: 'transparent',
  },

  allWhite: {
    borderTopColor: styleGuide.colors.white,
    backgroundColor: styleGuide.colors.white,
  },
  sticky: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
};

export default StyleSheet.create(styles);
