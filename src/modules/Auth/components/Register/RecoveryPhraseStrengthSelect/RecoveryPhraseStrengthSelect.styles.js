import { themes, colors, boxes } from 'constants/styleGuide';

export default function getRecoveryPhraseStrengthSelectStyles() {
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
      optionButton: {
        flexDirection: 'row',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.light.platinumGray,
        marginBottom: 16,
      },
      activeOptionButton: {
        backgroundColor: colors.light.athensWhite,
        borderColor: colors.light.ultramarineBlue,
      },
      optionHeader: {
        flex: 1,
      },
      optionTitle: {
        fontSize: 14,
        marginBottom: 4,
        fontWeight: '500',
      },
      optionDescription: {
        fontSize: 12,
      },
      optionCircle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 16,
        width: 16,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: colors.light.platinumGray,
      },
      activeOptionCircle: {
        borderColor: colors.light.ultramarineBlue,
        backgroundColor: colors.light.ultramarineBlue,
      },
      optionInnerCircle: {
        height: 8,
        width: 8,
        borderRadius: 24,
        backgroundColor: colors.light.white,
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
      optionTitle: {
        color: colors.light.zodiacBlue,
      },
      optionDescription: {
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
      optionTitle: {
        color: colors.dark.white,
      },
      optionDescription: {
        color: colors.dark.mountainMist,
      },
    },
  };
}
