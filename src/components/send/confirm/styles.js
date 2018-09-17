import { StyleSheet } from 'react-native';
import { colors, boxes } from '../../../constants/styleGuide';

const styles = {
  wrapper: {
    backgroundColor: colors.white,
  },
  container: {
    height: '100%',
  },
  innerContainer: {
    height: '100%',
    paddingTop: 36,
    paddingBottom: 24,
  },
  button: {
    marginRight: boxes.boxPadding,
    marginLeft: boxes.boxPadding,
  },
  buttonSticky: {
    borderRadius: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  subtitle: {
    marginTop: 7,
    color: colors.grayScale2,
  },
  input: {
    paddingRight: boxes.boxPadding,
    borderRightWidth: boxes.boxPadding,
    borderRightColor: 'transparent',
  },
  headings: {
    marginRight: boxes.boxPadding,
    marginLeft: boxes.boxPadding,
  },
  illustrationWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 40,
  },
  illustration: {
    width: 85,
    height: 85,
  },
  visible: {
    opacity: 1,
  },
  allWhite: {
    borderTopColor: colors.white,
    backgroundColor: colors.white,
  },
  sticky: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'yellow',
  },
};

export default StyleSheet.create(styles);
