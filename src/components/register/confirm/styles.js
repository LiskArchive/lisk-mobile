import { StyleSheet } from 'react-native';
import { SCREEN_HEIGHTS, deviceHeight } from '../../../utilities/device';
import { colors, fonts, boxes } from '../../../constants/styleGuide';

const isSmallDevice = deviceHeight() < SCREEN_HEIGHTS.SM;

const styles = {
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  headerContainer: {
  },
  header: {
    marginTop: 8,
  },
  subHeader: {
    marginTop: 8,
    marginBottom: 25,
    color: colors.light.gray2,
  },
  passphraseTitle: {
    color: colors.light.gray2,
  },
  passphraseContainer: {
    marginTop: 10,
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    paddingTop: 2,
    paddingBottom: 15,
  },
  word: {
    marginRight: 14,
    lineHeight: 40,
    color: colors.light.black,
    fontFamily: fonts.family.heading,
  },
  placeholder: {
    borderWidth: 1,
    borderColor: colors.light.ultramarineBlue,
    backgroundColor: colors.light.white,
    height: 28,
    lineHeight: 26,
    width: 75,
    marginRight: 4,
    marginTop: 6,
    borderRadius: 4,
    textAlign: 'center',
    overflow: 'hidden',
    color: colors.light.black,
    fontFamily: fonts.family.heading,
    fontSize: fonts.size.base,
  },
  deActivePlaceholder: {
    borderColor: colors.light.gray5,
    backgroundColor: colors.light.gray5,
    color: colors.light.white,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: isSmallDevice ? 65 : 99,
    height: isSmallDevice ? 79 : 120,
  },
  caption: {
    color: colors.light.gray2,
  },
  successButton: {
    borderColor: colors.light.ufoGreen,
    backgroundColor: colors.light.ufoGreen,
  },
  errorButton: {
    borderColor: colors.light.burntSieanna,
    backgroundColor: colors.light.burntSieanna,
  },
  selectedPlaceholder: {
    borderColor: colors.light.gray4,
    backgroundColor: colors.light.gray4,
  },
  optionsContainer: {
    marginTop: isSmallDevice ? 5 : 25,
    height: 38,
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  option: {
    height: 28,
    lineHeight: 26,
    width: 85,
    backgroundColor: '#74869B',
    borderRadius: 4,
    color: colors.light.white,
    fontFamily: fonts.family.heading,
    fontSize: fonts.size.base,
    textAlign: 'center',
    overflow: 'hidden',
  },
  horizontalPadding: {
    paddingLeft: boxes.boxPadding,
    paddingRight: boxes.boxPadding,
  },
  buttonWrapper: {
    paddingBottom: isSmallDevice ? 20 : 0,
  },
};

export default StyleSheet.create(styles);
