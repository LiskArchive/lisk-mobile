import { boxes, colors, fonts } from '../../../constants/styleGuide';

export default () => ({
  common: {
    container: {
      height: '100%',
      backgroundColor: colors.light.white,
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
    black: {
      color: colors.light.black,
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
      fontSize: 24,
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
      color: colors.light.gray2,
    },
    addressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      paddingBottom: 0,
      marginRight: 20,
    },
    link: {
      color: colors.light.blue,
    },
    errorContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginLeft: 20,
      paddingRight: 20,
      opacity: 0,
    },
    error: {
      color: colors.light.gray1,
      fontFamily: fonts.family.context,
      fontSize: fonts.size.input,
    },
    errorIcon: {
      color: colors.light.actionRed,
      marginRight: 5,
    },
    visible: {
      opacity: 1,
    },
  },
});
