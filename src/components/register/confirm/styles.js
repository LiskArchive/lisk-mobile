import { StyleSheet, Dimensions } from 'react-native';
import { colors, fonts } from '../../../constants/styleGuide';

const { height } = Dimensions.get('window');

const styles = {
  container: {
    flexDirection: 'column',
    marginRight: 20,
    marginLeft: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  headerContainer: {
  },
  header: {
    marginTop: 8,
  },
  subHeader: {
    marginTop: 7,
    color: colors.light.gray2,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  image: {
    width: 91,
    height: 110,
  },
  passphraseContainer: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
  },
  word: {
    marginRight: 10,
    lineHeight: height < 640 ? 30 : 39,
  },
  placeholder: {
    borderWidth: 1,
    borderColor: colors.light.blue,
    backgroundColor: colors.light.white,
    height: height < 640 ? 30 : 39,
    minWidth: 87,
    marginRight: 10,
    lineHeight: height < 640 ? 30 : 39,
    borderRadius: 4,
    marginBottom: 5,
    textAlign: 'center',
  },
  deActivePlaceholder: {
    borderColor: colors.light.gray5,
    backgroundColor: colors.light.gray5,
    borderWidth: 1,
    height: height < 640 ? 30 : 39,
    minWidth: 87,
    marginRight: 10,
    lineHeight: height < 640 ? 30 : 39,
    borderRadius: 4,
    marginBottom: 5,
    textAlign: 'center',
    overflow: 'hidden',
    color: colors.light.white,
    fontWeight: 'bold',
    fontSize: fonts.base,
  },
  successButton: {
    borderColor: colors.light.green,
    backgroundColor: colors.light.green,
  },
  errorButton: {
    borderColor: colors.light.red,
    backgroundColor: colors.light.red,
  },
  selectedPlaceholder: {
    borderColor: colors.light.gray4,
    backgroundColor: colors.light.gray4,
  },
  optionsContainer: {
    marginTop: height > 640 ? 25 : 5,
    height: 38,
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  option: {
    height: 38,
    lineHeight: 38,
    width: height > 640 ? 99 : 77,
    backgroundColor: '#74869B',
    borderRadius: 4,
    color: colors.light.white,
    textAlign: 'center',
    overflow: 'hidden',
  },
};

export default StyleSheet.create(styles);
