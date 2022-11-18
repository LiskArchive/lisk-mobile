import { StyleSheet } from 'react-native';
import { SCREEN_HEIGHTS, deviceHeight } from 'utilities/device';
import { colors, fonts, boxes } from 'constants/styleGuide';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;

const styles = {
  wrapper: {
    flex: 1,
  },
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: boxes.boxPadding,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  passphraseTitle: {
    color: colors.light.blueGray,
    fontSize: isSmallScreen ? 14 : 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  passphraseContainer: {
    justifyContent: 'space-between',
    height: isSmallScreen ? 290 : 320,
    borderWidth: 1,
    borderColor: colors.light.mystic,
    marginHorizontal: 20,
    padding: boxes.boxPadding,
    alignItems: 'center',
  },
  passphrase: {
    lineHeight: 33,
    fontSize: isSmallScreen ? 16 : 18,
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
    fontSize: isSmallScreen ? 14 : 16,
  },
  footer: {
    padding: boxes.boxPadding,
  },
  switchContainer: {
    position: 'absolute',
    bottom: 88,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  confirmText: {
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 13.5,
    color: colors.light.blueGray,
    fontSize: isSmallScreen ? 11 : 13,
  },
};

export default StyleSheet.create(styles);
