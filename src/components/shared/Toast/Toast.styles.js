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
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: 4,
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
  };
}
