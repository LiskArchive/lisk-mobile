import { colors, fonts, boxes } from 'constants/styleGuide';

export default () => ({
  common: {
    navContainer: {},
    title: {
      fontFamily: fonts.family.heading,
      fontSize: 24,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: boxes.boxPadding,
      paddingRight: boxes.boxPadding,
    },
    flex: {
      flex: 1,
      justifyContent: 'center',
    },
    cancelButton: {
      color: colors.light.ultramarineBlue,
      marginLeft: 16,
    },
    input: {
      paddingBottom: 8,
      paddingTop: 8,
      fontFamily: fonts.family.context,
    },
  },
});
