import { themes, boxes, colors, fonts } from '../../../constants/styleGuide';

export default () => ({
  common: {
    container: {
      height: '100%',
    },
    innerContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginRight: boxes.boxPadding,
      marginLeft: boxes.boxPadding,
      paddingTop: 36,
      paddingBottom: 35,
    },
    verticalAligner: {
      padding: 20,
    },
    centerAlign: {
      textAlign: 'center',
    },
    leftAlign: {
      textAlign: 'left',
    },
    heading: {
      fontSize: 24,
      paddingBottom: 80,
    },
    row: {
      marginBottom: 4,
    },
    title: {
      fontSize: 12,
      paddingBottom: 10,
    },
    amount: {
      paddingBottom: 15,
    },
    address: {
      paddingBottom: 15,
    },
    button: {
      borderRadius: 0,
      marginBottom: 0,
      marginTop: 20,
    },
    label: {
      marginTop: 15,
      marginBottom: 7,
      color: colors.light.gray1,
      fontFamily: fonts.family.contextLight,
      fontSize: fonts.size.input,
      fontWeight: '400',
    },
    subtitle: {
      marginTop: 7,
    },
    addressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      paddingBottom: 0,
      marginRight: 20,
    },
    errorContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginLeft: 20,
      paddingRight: 20,
      opacity: 0,
    },
    error: {
      fontFamily: fonts.family.context,
      fontSize: fonts.size.input,
    },
    errorIcon: {
      marginRight: 5,
    },
    visible: {
      opacity: 1,
    },
  },
  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
    },
    text: {
      color: colors.light.black,
    },
    label: {
      color: colors.light.gray1,
    },
    headerTitle: {
      color: colors.light.black,
    },
    subtitle: {
      color: colors.light.gray2,
    },
    link: {
      color: colors.light.blue,
    },
    error: {
      color: colors.light.gray1,
    },
    errorIcon: {
      color: colors.light.red,
    },
  },
  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.screenBgNavy,
    },
    text: {
      color: colors.dark.white,
    },
    label: {
      color: colors.dark.gray4,
    },
    headerTitle: {
      color: colors.dark.white,
    },
    subtitle: {
      color: colors.dark.gray4,
    },
    link: {
      color: colors.dark.blue,
    },
    error: {
      color: colors.dark.gray4,
    },
    errorIcon: {
      color: colors.dark.red,
    },
  },
});
