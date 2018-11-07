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
  passphraseContainer: {
    backgroundColor: colors.light.white,
    padding: 20,
    shadowColor: '#0279b6',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    marginTop: 10,
  },
  passphraseTitle: {
    color: colors.light.gray2,
  },
  imageDescription: {
    color: colors.light.gray2,
    marginTop: 16,
    fontFamily: fonts.family.context,
  },
  passphrase: {
    marginTop: 7,
    color: colors.light.black,
  },
  copyContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  copy: {
    color: colors.light.blue,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 111,
    height: 111,
  },
  caption: {
    color: colors.light.gray2,
    marginTop: 15,
  },
};

export default StyleSheet.create(styles);
