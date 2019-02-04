import {
  StyleSheet,
} from "react-native"; // eslint-disable-line
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
  title: {
    textAlign: 'center',
  },
  link: {
    fontSize: 13,
    color: colors.light.blue,
  },
  description: {
    marginTop: 7,
    textAlign: 'center',
    color: colors.light.gray2,
  },
});
