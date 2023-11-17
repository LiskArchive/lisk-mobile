import { themes, colors, fonts } from 'constants/styleGuide';
import { deviceWidth } from 'utilities/device';

export default function getToastStyles() {
  return {
    common: {
      container: {
        flex: 1,
        margin: 16,
        width: deviceWidth() - 32,
      },
      body: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: 4,
      },
      textContainer: {
        flex: 1,
      },
      icon: {
        marginRight: 12,
      },
      title: {
        fontSize: fonts.size.input,
        marginBottom: 4,
      },
      description: {
        fontSize: fonts.size.input,
      },
    },
    [themes.light]: {
      successBody: {
        backgroundColor: '#F9FFFC',
        borderColor: colors.light.ufoGreen,
      },
      successTitle: {
        color: colors.light.ufoGreen,
      },
      successDescription: {
        color: colors.light.ufoGreen,
      },
      errorBody: {
        backgroundColor: '#FFF6F7',
        borderColor: colors.light.furyRed,
      },
      errorTitle: {
        color: colors.light.furyRed,
      },
      errorDescription: {
        color: colors.light.furyRed,
      },
    },
    [themes.dark]: {
      successBody: {
        backgroundColor: colors.dark.satinDeepBlack,
        borderColor: colors.dark.ufoGreen,
      },
      successTitle: {
        color: colors.dark.ufoGreen,
      },
      successDescription: {
        color: colors.dark.ufoGreen,
      },
      errorBody: {
        backgroundColor: colors.dark.satinDeepBlack,
        borderColor: colors.dark.furyRed,
      },
      errorTitle: {
        color: colors.dark.furyRed,
      },
      errorDescription: {
        color: colors.dark.furyRed,
      },
    },
  };
}
