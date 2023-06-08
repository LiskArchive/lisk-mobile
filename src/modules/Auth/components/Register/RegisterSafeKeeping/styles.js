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
        fontWeight: '600',
        fontSize: 20,
        marginBottom: 12,
      },
      description: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 32,
      },
      recoveryPhraseContainer: {
        borderWidth: 1,
        borderColor: colors.light.mystic,
        marginHorizontal: 20,
        padding: boxes.boxPadding,
        borderRadius: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      recoveryPhraseText: {
        lineHeight: 33,
        fontSize: isSmallScreen ? 16 : 18,
        fontFamily: fonts.family.recoveryPhraseText,
        textAlign: 'center',
      },
      copyContainer: {
        alignItems: 'center',
        marginTop: 32,
      },
      copyLabel: {
        color: colors.light.ultramarineBlue,
        fontSize: fonts.size.base,
        fontWeight: '600',
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
      recoveryPhraseText: {
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
      recoveryPhraseText: {
        color: colors.dark.white,
      },
    },
  };
}
