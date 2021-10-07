import { themes, colors, fonts } from '../../../../constants/styleGuide';
import { setColorOpacity } from '../../../../utilities/helpers';

export default () => ({
  common: {
    pendingIcon: {
      height: 18,
      width: 18,
    },
    votesContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 3,
      padding: 5,
      marginRight: 8,
      marginVertical: 2.5,
    },
    voteNumberContainer: {
      borderRadius: 4,
      marginRight: 8,
      fontSize: fonts.size.small,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 3,
    },
    voteNumber: {
      fontSize: fonts.size.small,
    },
    vote: {
      fontSize: fonts.size.small,
    },
    votesRow: {
      flexWrap: 'wrap',
    },
  },

  [themes.light]: {
    votesContainer: {
      backgroundColor: colors.light.platinum,
    },
    voteNumber: {
      color: colors.light.ultramarineBlue,
    },
  },

  [themes.dark]: {
    votesContainer: {
      backgroundColor: colors.dark.blueGray,
    },
    voteNumber: {
      color: colors.dark.white,
    },
    vote: {
      color: colors.dark.white,
    },
  },
});
