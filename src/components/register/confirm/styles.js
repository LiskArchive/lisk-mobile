import { StyleSheet } from 'react-native';
import { deviceType } from '../../../utilities/device';
import { colors, fonts, boxes } from '../../../constants/styleGuide';

const styles = {
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  box: {
    borderWidth: 1,
    borderColor: colors.light.mystic,
    marginHorizontal: 20,
    padding: boxes.boxPadding,
    alignItems: 'center',
  },
  passphraseTitle: {
    color: colors.light.blueGray,
    fontSize: 16,
    marginBottom: 30,
  },
  passphraseContainer: {
    marginTop: 10,
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  word: {
    marginHorizontal: 7,
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
    fontSize: fonts.size.base,
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
    marginTop: 35,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  optionPlaceholder: {
    height: 33,
  },
  label: {
    fontFamily: fonts.family.passphraseText,
    fontSize: 18,
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
    marginBottom: deviceType() === 'iOSx' ? 20 : 0,
  },
};

export default StyleSheet.create(styles);
