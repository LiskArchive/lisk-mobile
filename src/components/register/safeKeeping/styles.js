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
  passphrase: {
    marginBottom: 30,
    lineHeight: 33,
    fontSize: 18,
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
  footer: {
    padding: boxes.boxPadding,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  confirmText: {
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 13.5,
    color: colors.light.blueGray,
    fontSize: 13,
  },
  buttonWrapper: {
    marginBottom: deviceType() === 'iOSx' ? 20 : 0,
  },
};

export default StyleSheet.create(styles);
