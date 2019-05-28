import { StyleSheet } from 'react-native';
import { SCREEN_HEIGHTS, deviceHeight } from '../../../utilities/device';
import { colors, fonts, boxes } from '../../../constants/styleGuide';

const styles = {
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 8,
  },
  titleContainer: {
    paddingLeft: boxes.boxPadding,
    paddingRight: boxes.boxPadding,
  },
  subTitle: {
    color: colors.light.gray2,
  },
  subHeader: {
    marginTop: 8,
    marginBottom: 25,
    color: colors.light.gray2,
  },
  label: {
    color: colors.light.gray2,
    marginLeft: 12,
  },
  passphraseTitle: {
    color: colors.light.gray2,
    paddingLeft: boxes.boxPadding,
    paddingRight: boxes.boxPadding,
  },
  passphraseContainer: {
    marginTop: 10,
    paddingLeft: boxes.boxPadding,
    paddingRight: boxes.boxPadding,
    backgroundColor: colors.light.navigationBg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#ebf1f4',
    borderBottomColor: '#ebf1f4',
  },
  imageDescription: {
    color: colors.light.gray2,
    marginTop: 16,
    fontFamily: fonts.family.context,
  },
  passphrase: {
    marginTop: 2,
    lineHeight: 40,
    marginBottom: 5,
    color: colors.light.black,
    fontFamily: fonts.family.heading,
  },
  copyContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  copy: {
    color: colors.light.ultramarineBlue,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  image: {
    width: 111,
    height: 111,
  },
  caption: {
    color: colors.light.gray2,
    marginTop: 15,
  },
  buttonWrapper: {
    paddingLeft: boxes.boxPadding,
    paddingRight: boxes.boxPadding,
    marginBottom: deviceHeight() < SCREEN_HEIGHTS.SM ? 20 : 0,
  },
};

export default StyleSheet.create(styles);
