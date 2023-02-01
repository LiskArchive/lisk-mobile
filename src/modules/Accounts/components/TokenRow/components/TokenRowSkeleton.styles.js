import { colors, themes } from 'constants/styleGuide';

export default function getTokenRowSkeletonStyles() {
  return {
    common: {
      container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 8,
        padding: 16,
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    },
    [themes.light]: {
      container: {
        borderColor: colors.light.platinumGray,
      },
    },
    [themes.dark]: {
      container: {
        borderColor: colors.dark.textInputBg,
      },
    },
  };
}
