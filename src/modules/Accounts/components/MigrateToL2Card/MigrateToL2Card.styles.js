import { themes, colors, fonts } from 'constants/styleGuide';
import { setColorOpacity } from 'utilities/helpers';

export default function getMigrateToL2CardStyles() {
  return {
    common: {
      container: {
        flexDirection: 'row',
        borderRadius: 8,
        padding: 16,
        gap: 8,
      },
      textContainer: {
        gap: 8,
        flex: 1,
      },
      icon: {
        marginTop: 4,
      },
      linkContainer: {
        gap: 8,
        flexDirection: 'row',
        alignItems: 'center',
      },
      link: {
        fontSize: fonts.size.small,
        fontWeight: '600',
      },
    },
    [themes.light]: {
      container: {
        backgroundColor: setColorOpacity(colors.light.ultramarineBlue, 0.1),
      },
      description: {
        color: colors.light.slateGray,
      },
      link: {
        color: colors.light.ultramarineBlue,
      },
    },
    [themes.dark]: {
      container: {
        backgroundColor: colors.dark.mainBg,
      },
      description: {
        color: colors.dark.white,
      },
      link: {
        color: colors.dark.ultramarineBlue,
      },
    },
  };
}
