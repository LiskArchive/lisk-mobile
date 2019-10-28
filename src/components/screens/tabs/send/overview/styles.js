import {
  themes,
  boxes,
  colors,
  fonts,
} from '../../../../../constants/styleGuide';
import { setColorOpacity } from '../../../../../utilities/helpers';

export default () => ({
  common: {
    container: {},
    innerContainer: {
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      margin: boxes.boxPadding,
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
      paddingTop: 5,
      paddingRight: 0,
      paddingBottom: 0,
    },
    button: {
      borderRadius: 0,
      marginBottom: 0,
      marginTop: 20,
    },
    label: {
      marginTop: 14,
      marginBottom: 2,
      color: colors.light.slateGray,
      fontFamily: fonts.family.context,
      fontSize: fonts.size.input,
      fontWeight: '400',
    },
    text: {
      flexWrap: 'wrap',
      flex: 1,
      paddingRight: 30,
    },
    subtitle: {
      marginTop: 7,
    },
    addressContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      paddingTop: boxes.boxPadding,
      paddingBottom: boxes.boxPadding,
    },
    addressIconContainer: {
      width: 50,
      height: 50,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    addressIcon: {},
    avatar: {
      marginBottom: 10,
    },
    visible: {
      opacity: 1,
    },
    link: {
      paddingLeft: 4,
    },
  },

  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
    },
    addressIconContainer: {
      backgroundColor: colors.light.BTC,
    },
    row: {
      borderBottomColor: colors.light.mystic,
    },
    text: {
      color: colors.light.black,
    },
    address: {
      color: colors.light.slateGray,
    },
    label: {
      color: colors.light.slateGray,
    },
    subtitle: {
      color: colors.light.slateGray,
    },
    link: {
      color: colors.light.ultramarineBlue,
    },
  },

  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.mainBg,
    },
    addressIconContainer: {
      backgroundColor: colors.dark.BTC,
    },
    row: {
      borderBottomColor: setColorOpacity(colors.light.white, 0.15),
    },
    text: {
      color: colors.dark.white,
    },
    address: {
      color: colors.light.platinum,
    },
    label: {
      color: colors.dark.ghost,
    },
    subtitle: {
      color: colors.dark.ghost,
    },
    link: {
      color: colors.dark.ultramarineBlue,
    },
  },
});
