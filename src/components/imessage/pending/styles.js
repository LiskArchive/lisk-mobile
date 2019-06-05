import { StyleSheet } from 'react-native';
import { boxes, colors, fonts } from '../../../constants/styleGuide';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.light.white,
    flex: 1,
  },
  innerContainer: {
    flexGrow: 1,
    alignItems: 'center',
    flex: 1,
    margin: boxes.boxPadding,
  },
  image: {
    width: 250,
    height: 250,
    marginTop: -60,
    marginBottom: -50,
  },
  description: {
    textAlign: 'center',
    color: colors.light.maastrichtBlue,
    fontSize: fonts.size.base,
    fontWeight: 'normal',
  },
});
