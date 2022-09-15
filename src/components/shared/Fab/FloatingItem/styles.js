import { StyleSheet } from 'react-native';
import { colors, fonts } from 'constants/styleGuide';

export default StyleSheet.create({
  container: {
    elevation: 0,
    flex: 1,
    flexDirection: 'column',
  },
  actionContainer: {
    elevation: 0,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 0,
  },
  textContainer: {
    paddingHorizontal: 8,
    elevation: 5,
    borderRadius: 4,
    height: 22,
  },
  text: {
    fontSize: 15,
    fontFamily: fonts.family.contextBold,
    color: colors.light.white,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.light.ultramarineBlue,
  },
});
