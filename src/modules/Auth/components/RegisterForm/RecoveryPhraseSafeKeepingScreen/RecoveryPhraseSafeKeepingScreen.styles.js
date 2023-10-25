import { themes, colors, fonts, boxes } from 'constants/styleGuide';

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
      recoveryPhraseWordsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 8,
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
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
      },
      confirmText: {
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 13.5,
        color: colors.light.blueGray,
        fontSize: fonts.size.input,
      },
      securityAdviceCard: {
        marginBottom: 24,
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
      recoveryPhraseIndexText: {
        color: colors.light.smoothGray,
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
      recoveryPhraseIndexText: {
        color: colors.light.mountainMist,
      },
    },
  };
}
