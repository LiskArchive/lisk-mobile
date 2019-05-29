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
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  passphraseTitle: {
    color: colors.light.blueGray,
    fontSize: 16,
    marginBottom: 30,
  },
  passphraseContainer: {
    borderWidth: 1,
    borderColor: colors.light.mystic,
    marginHorizontal: 20,
    padding: boxes.boxPadding,
    alignItems: 'center',
  },
  imageDescription: {
    color: colors.light.gray2,
    marginTop: 16,
    fontFamily: fonts.family.context,
  },
  passphrase: {
    marginBottom: 30,
    lineHeight: 33,
    color: colors.light.black,
    fontFamily: fonts.family.passphraseText,
    textAlign: 'center',
  },
  copyContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  copy: {
    color: colors.light.ultramarineBlue,
    fontSize: 16,
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
