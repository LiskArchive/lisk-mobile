import { StyleSheet } from 'react-native';
import { boxes, colors } from '../../../constants/styleGuide';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.light.white,
    flex: 1,
  },
  innerContainer: {
    marginTop: -30,
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: boxes.boxPadding,
  },
  description: {
    marginTop: -45,
    textAlign: 'center',
  },
});
