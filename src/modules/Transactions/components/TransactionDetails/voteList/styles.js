import { themes, colors, fonts } from 'constants/styleGuide';

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
    voteAddressContainer: {
      borderRadius: 4,
      marginRight: 8,
      fontSize: fonts.size.small,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 3,
    },
    voteAddress: {
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
    voteAddress: {
      color: colors.light.ultramarineBlue,
    },
    amount: {
      color: colors.light.black
    }
  },

  [themes.dark]: {
    votesContainer: {
      backgroundColor: colors.dark.blueGray,
    },
    voteAddress: {
      color: colors.dark.whiteSmoke,
    },
    vote: {
      color: colors.dark.white,
    },
    amount: {
      color: colors.light.whiteSmoke
    }
  },
});
