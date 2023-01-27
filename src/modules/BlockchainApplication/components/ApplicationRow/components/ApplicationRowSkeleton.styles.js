import { themes, colors } from 'constants/styleGuide';

export default function getApplicationRowSkeletonStyles() {
  return {
    common: {
      container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    },
    [themes.light]: {
      container: {
        borderBottomColor: colors.light.platinumGray,
      },
    },

    [themes.dark]: {
      container: {
        borderBottomColor: colors.dark.volcanicSand,
      },
    },
  };
}
