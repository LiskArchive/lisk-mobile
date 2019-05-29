import { StyleSheet } from 'react-native';
import { boxes, colors, fonts } from '../../../constants/styleGuide';

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
    fontFamily: fonts.family.heading,
  },
  link: {
    fontWeight: '600',
    fontSize: 13,
    color: colors.light.ultramarineBlue,
  },
  description: {
    marginTop: 7,
    textAlign: 'center',
    color: colors.light.slateGray,
  },
});
