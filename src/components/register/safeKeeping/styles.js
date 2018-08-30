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
    marginTop: 8,
    paddingBottom: 12,
  },
  subTitle: {
    color: colors.grayScale2,
  },
  subHeader: {
    marginTop: 14,
    marginBottom: 25,
    color: colors.grayScale1,
  },
  label: {
    color: colors.grayScale2,
    marginLeft: 12,
  },
  passphraseContainer: {
    backgroundColor: colors.white,
    padding: 20,
    shadowColor: '#0279b6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    marginTop: 24,
    elevation: 5,
  },
  passphraseTitle: {
    color: colors.grayScale2,
  },
  imageDescription: {
    color: colors.grayScale2,
    marginTop: 16,
    fontFamily: fonts.family.context,
  },
  passphrase: {
    marginTop: 7,
    color: colors.primary1,
  },
  copyContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  copy: {
    color: colors.primary5,
  },
  image: {
    alignItems: 'center',
  },
};

export default StyleSheet.create(styles);
// box-shadow: 0 0 20px 0 ;
