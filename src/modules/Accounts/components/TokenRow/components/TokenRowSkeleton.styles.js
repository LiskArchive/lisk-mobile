import { colors } from 'constants/styleGuide';

export default function getTokenRowSkeletonStyles() {
  return {
    common: {
      container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: colors.light.platinumGray,
        borderRadius: 8,
        padding: 16,
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    },
  };
}
