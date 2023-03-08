import { SCREEN_HEIGHTS, deviceHeight } from 'utilities/device';
import { themes, colors, fonts, boxes } from 'constants/styleGuide';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;

export default function getRegisterSafeKeepingStyles() {
  return {
    common: {
      container: {
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
      description: {
        fontSize: isSmallScreen ? 14 : 16,
        textAlign: 'center',
        marginBottom: 24,
      },
      passphraseContainer: {
        borderWidth: 1,
        borderColor: colors.light.mystic,
        marginHorizontal: 20,
        padding: boxes.boxPadding,
        borderRadius: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: isSmallScreen ? 290 : 320,
      },
      passphraseText: {
        lineHeight: 33,
        fontSize: isSmallScreen ? 16 : 18,
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
    },
    [themes.light]: {
      container: {
        backgroundColor: colors.light.white,
      },
      title: {
        color: colors.light.zodiacBlue,
      },
      description: {
        color: colors.light.smoothGray,
      },
      passphraseText: {
        color: colors.light.zodiacBlue,
      },
    },
    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
      },
      title: {
        color: colors.dark.white,
      },
      description: {
        color: colors.dark.mountainMist,
      },
      passphraseText: {
        color: colors.dark.white,
      },
    },
  };
}
