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
      paddingBottom: 28,
    },
    row: {
      paddingBottom: 14,
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    icon: {
      marginTop: 25,
    },
    rowContent: {
      paddingLeft: 13,
    },
    title: {
      fontSize: 12,
      paddingBottom: 10,
    },
    amount: {
      paddingBottom: 15,
    },
    address: {
      paddingBottom: 20,
      paddingTop: 5,
    },
    button: {
      borderRadius: 0,
      marginBottom: 0,
      marginTop: 20,
    },
    label: {
      marginTop: 14,
      marginBottom: 2,
      color: colors.light.gray1,
      fontFamily: fonts.family.contextLight,
      fontSize: fonts.size.input,
      fontWeight: '400',
    },
    subtitle: {
      marginTop: 7,
    },
    addressContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
    avatar: {
      paddingBottom: 10,
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
    row: {
      borderBottomColor: colors.light.gray5,
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
    row: {
      borderBottomColor: colors.dark.gray5,
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
