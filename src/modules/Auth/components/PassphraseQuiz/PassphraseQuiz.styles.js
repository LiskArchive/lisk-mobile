import { deviceHeight, SCREEN_HEIGHTS } from 'utilities/device';
import { themes, colors, fonts, boxes } from 'constants/styleGuide';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;

export default function getPassphraseQuizStyles() {
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
      box: {
        borderWidth: 1,
        borderColor: colors.light.mystic,
        marginHorizontal: 20,
        padding: boxes.boxPadding,
        borderRadius: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: isSmallScreen ? 290 : 320,
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
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'center',
      },
      passphraseText: {
        marginHorizontal: 7,
        fontSize: isSmallScreen ? 16 : 18,
        lineHeight: 33,
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
      option: {
        lineHeight: 33,
        fontSize: fonts.size.base,
        textAlign: 'center',
      },
      footer: {
        padding: boxes.boxPadding,
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
      label: {
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
      label: {
        color: colors.dark.white,
      },
    },
  };
}
