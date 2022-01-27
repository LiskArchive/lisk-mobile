import { themes, colors, fonts } from '../../../../../constants/styleGuide';

export default () => ({
  common: {
    container: {
      paddingTop: 2,
    },
    content: {
      padding: 20,
    },
    tableContent: {
      paddingTop: 20,
    },
    row: {
      flexDirection: 'row',
      paddingBottom: 14,
      borderBottomWidth: 1,
      marginVertical: 7,
    },
    flex: {
      flex: 1,
    },
    flexOne: {
      flex: 1.3
    },
    flexRow: {
      flexDirection: 'row',
    },
    iconContainer: {
      marginRight: 13,
      marginTop: 5
    },
    text: {
      fontSize: 17,
      flex: 1,
    },
    headerText: {
      fontSize: 17,
      flex: 1,
      fontFamily: fonts.family.contextSemiBold
    },
  },
  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
      flex: 1
    },
    row: {
      borderBottomColor: colors.light.platinum
    },
    infoText: {
      color: colors.light.black,
    },
    text: {
      color: colors.light.zodiacBlue
    }
  },
  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.black,
      flex: 1
    },
    infoText: {
      color: colors.dark.platinum
    },
    text: {
      color: colors.dark.white
    },
    row: {
      borderBottomColor: colors.light.white
    },
  }
});
