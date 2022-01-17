import {
  themes,
  boxes,
  colors,
  fonts,
} from '../../../../../constants/styleGuide';
import { setColorOpacity } from '../../../../../utilities/helpers';

export default () => ({
  common: {
    container: {
      paddingTop: 10,
    },
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
    bookmark: {
      paddingTop: 8,
    },
    rowContent: {
      paddingTop: 5,
      paddingBottom: 20,
      borderBottomWidth: 1,
    },
    title: {
      fontSize: 12,
      paddingBottom: 10,
    },
    amount: {
      paddingBottom: 15,
    },
    address: {
      paddingRight: 0,
      paddingBottom: 0,
      fontSize: 15
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
      fontSize: 17,
      fontFamily: fonts.family.contextSemiBold
    },
    subtitle: {
      marginTop: 7,
    },
    addressContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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
    rowContent: {
      borderBottomColor: colors.light.mystic,
    },
    text: {
      color: colors.light.black,
    },
    address: {
      color: colors.light.slateGray,
    },
    label: {
      color: colors.light.zodiacBlue,
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
    rowContent: {
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
