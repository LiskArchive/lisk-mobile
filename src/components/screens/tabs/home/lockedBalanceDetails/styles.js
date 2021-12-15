import { themes, colors } from '../../../../../constants/styleGuide';

export default () => ({
  common: {
    container: {
      paddingTop: 20,
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
    flexOne: {
      flex: 1
    },
    text: {
      fontSize: 18,
    },
  },
  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
      flex: 1
    },
    row: {
      borderBottomColor: colors.light.grey
    },
    infoText: {
      color: colors.light.black
    },
    text: {
      color: colors.light.black
    }
  },
  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.black,
      flex: 1
    },
    infoText: {
      color: colors.dark.grey
    },
    text: {
      color: colors.dark.white
    },
    row: {
      borderBottomColor: colors.light.white
    },
  }
});
