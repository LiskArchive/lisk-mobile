import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../../constants/styleGuide';

const styles = {
  container: {
    flexDirection: 'column',
    marginRight: 20,
    marginLeft: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 17,
  },
  subHeader: {
    marginTop: 14,
    marginBottom: 25,
    color: colors.grayScale1,
  },
  image: {
    alignItems: 'center',
  },
  passphraseContainer: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
  },
  word: {
    marginRight: 10,
    lineHeight: 39,
  },
  placeholder: {
    borderWidth: 1,
    borderColor: colors.primary5,
    backgroundColor: colors.white,
    height: 39,
    minWidth: 87,
    marginRight: 10,
    lineHeight: 39,
    borderRadius: 4,
    marginBottom: 5,
    textAlign: 'center',
  },
  deActivePlaceholder: {
    borderColor: colors.grayScale5,
    backgroundColor: colors.grayScale5,
    borderWidth: 1,
    height: 39,
    minWidth: 87,
    marginRight: 10,
    lineHeight: 39,
    borderRadius: 4,
    marginBottom: 5,
    textAlign: 'center',
    overflow: 'hidden',
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fonts.base,
  },
  successButton: {
    borderColor: colors.success1,
    backgroundColor: colors.success1,
  },
  errorButton: {
    borderColor: colors.action1,
    backgroundColor: colors.action1,
  },
  selectedPlaceholder: {
    borderColor: colors.grayScale3,
    backgroundColor: colors.grayScale3,
  },
  optionsContainer: {
    marginTop: 25,
    height: 38,
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  option: {
    height: 38,
    lineHeight: 38,
    width: 99,
    backgroundColor: '#74869B',
    borderRadius: 4,
    color: colors.white,
    textAlign: 'center',
    overflow: 'hidden',
  },
};

export default StyleSheet.create(styles);
