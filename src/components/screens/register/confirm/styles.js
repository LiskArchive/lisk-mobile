import { StyleSheet } from 'react-native';
import { deviceHeight, SCREEN_HEIGHTS } from '../../../../utilities/device';
import { colors, fonts, boxes } from '../../../../constants/styleGuide';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;

const styles = {
  wrapper: {
    flex: 1,
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  box: {
    borderWidth: 1,
    borderColor: colors.light.mystic,
    marginHorizontal: 20,
    padding: boxes.boxPadding,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: isSmallScreen ? 290 : 320,
  },
  passphraseTitle: {
    color: colors.light.blueGray,
    fontSize: isSmallScreen ? 14 : 16,
  },
  passphraseContainer: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  word: {
    marginHorizontal: 7,
    fontSize: isSmallScreen ? 16 : 18,
    lineHeight: 33,
    color: colors.light.black,
    fontFamily: fonts.family.passphraseText,
  },
  placeholder: {
    borderBottomWidth: 1.5,
    height: 33,
    marginHorizontal: 5,
    minWidth: 75,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: fonts.family.passphraseText,
    fontSize: isSmallScreen ? 14 : 16,
  },
  deActivePlaceholder: {
    borderBottomColor: colors.light.ghost,
  },
  noBorderBottom: {
    borderBottomWidth: 0,
  },
  selectedPlaceholder: {
    borderBottomColor: colors.light.ultramarineBlue,
  },
  filledOutPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0,
  },
  optionsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  optionPlaceholder: {
    height: 33,
  },
  label: {
    fontFamily: fonts.family.passphraseText,
    fontSize: isSmallScreen ? 16 : 18,
    lineHeight: 33,
  },
  labelUnchecked: {
    color: colors.light.slateGray,
  },
  labelCorrect: {
    color: colors.light.ufoGreen,
  },
  labelIncorrect: {
    color: colors.light.burntSieanna,
  },
  labelOption: {
    color: colors.light.ultramarineBlue,
  },
  option: {
    lineHeight: 33,
    fontSize: fonts.size.base,
    textAlign: 'center',
  },
  horizontalPadding: {
    paddingLeft: boxes.boxPadding,
    paddingRight: boxes.boxPadding,
  },
  buttonWrapper: {
    padding: boxes.boxPadding,
  },
};

export default StyleSheet.create(styles);
