import { colors, fonts, boxes } from 'constants/styleGuide';

export default () => ({
  common: {
    container: {
      flex: 1,
      backgroundColor: colors.light.ultramarineBlue,
    },
    contentContainer: {
      padding: boxes.boxPadding,
      paddingTop: 60,
    },
    title: {
      fontFamily: fonts.family.contextSemiBold,
      color: colors.dark.white,
      paddingTop: 15,
    },
    content: {
      color: colors.dark.white,
      marginTop: 20,
    },
    flex: {
      flex: 1,
    },
    illustrationContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: colors.light.white,
      margin: boxes.boxPadding,
    },
    buttonText: {
      color: colors.light.ultramarineBlue,
    },
  },
});
