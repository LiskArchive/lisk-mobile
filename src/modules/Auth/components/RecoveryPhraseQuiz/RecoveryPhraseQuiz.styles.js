import { themes, colors, fonts, boxes } from 'constants/styleGuide';

export default function getRecoveryPhraseQuizStyles() {
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
        marginBottom: 24,
      },
      recoveryPhraseContainer: {
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 32,
      },
      recoveryPhraseWordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      recoveryPhraseText: {
        lineHeight: 33,
        fontSize: fonts.size.base,
        fontFamily: fonts.family.recoveryPhraseText,
      },
      placeholder: {
        borderBottomWidth: 1.5,
        height: 33,
        marginHorizontal: 5,
        minWidth: 75,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: fonts.family.recoveryPhraseText,
        fontSize: fonts.size.base,
        borderBottomColor: colors.light.ultramarineBlue,
      },
      deActivePlaceholder: {
        borderBottomColor: colors.light.ghost,
      },
      placeHolderCorrect: {
        borderBottomColor: colors.light.ufoGreen,
      },
      placeHolderIncorrect: {
        borderBottomColor: colors.light.burntSieanna,
      },
      selectedPlaceholder: {
        borderBottomColor: colors.light.ultramarineBlue,
      },
      filledOutPlaceholder: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomColor: colors.light.ultramarineBlue,
      },
      optionsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
      },
      optionPlaceholder: {
        height: 33,
      },
      label: {
        fontFamily: fonts.family.recoveryPhraseText,
        fontSize: fonts.size.base,
        lineHeight: 33,
      },
      labelUnchecked: {
        color: colors.light.ultramarineBlue,
        fontSize: 16,
      },
      labelCorrect: {
        color: colors.light.ufoGreen,
        fontSize: fonts.size.base,
      },
      labelIncorrect: {
        color: colors.light.burntSieanna,
        fontSize: fonts.size.base,
      },
      option: {
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: colors.light.mystic,
        paddingVertical: 2,
        paddingHorizontal: 8,
        marginHorizontal: 5,
        marginBottom: 10,
        borderRadius: 8,
        minWidth: 56,
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
      recoveryPhraseText: {
        color: colors.light.zodiacBlue,
      },
      label: {
        color: colors.light.zodiacBlue,
      },
      recoveryPhraseIndexText: {
        color: colors.light.smoothGray,
      },
      recoveryPhraseSelectedIndexText: {
        color: colors.light.ultramarineBlue,
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
      label: {
        color: colors.dark.white,
      },
      recoveryPhraseIndexText: {
        color: colors.light.mountainMist,
      },
      recoveryPhraseSelectedIndexText: {
        color: colors.light.ultramarineBlue,
      },
    },
  };
}
