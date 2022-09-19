import { themes, colors, boxes, fonts } from 'constants/styleGuide';
import { deviceType } from 'utilities/device';

const type = deviceType();

const safeAreaMarginTop = type === 'iOSx' ? 45 : 20;

export default {
  common: {
    flex: {
      flex: 1,
    },
    container: {
      paddingTop: safeAreaMarginTop,
    },
    header: {
      height: 230,
      backgroundColor: colors.light.ultramarineBlue,
    },
    explore: {
      paddingTop: 40,
    },
    body: {
      padding: boxes.boxPadding,
    },
    logoContainer: {
      marginTop: -35,
      height: 70,
      width: 70,
      borderRadius: 35,
      alignSelf: 'center',
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    pinIcon: {
      marginHorizontal: 5,
    },
    title: {
      marginHorizontal: 5,
      textAlign: 'center',
      fontFamily: fonts.family.contextSemiBold,
    },
    address: {
      textAlign: 'center',
      fontSize: fonts.size.small,
      fontFamily: fonts.family.context,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    appLinkContainer: {
      justifyContent: 'center',
      marginBottom: 10,
    },
    depositedContainer: {
      justifyContent: 'center',
      marginVertical: 25,
    },
    deposited: {
      fontSize: 14,
      color: colors.light.blueGray,
    },
    smallTitle: {
      fontSize: 14,
      color: colors.light.blueGray,
      marginBottom: 10,
    },
    amount: {
      color: colors.light.ultramarineBlue,
      fontFamily: fonts.family.contextBold,
      fontSize: 18,
    },
    url: {
      fontSize: 14,
      marginLeft: 8,
      color: colors.light.ultramarineBlue,
    },
    stats: {
      flex: 1,
      flexDirection: 'row',
    },
    item: {
      marginBottom: 20,
    },
    value: {
      fontFamily: fonts.family.contextSemiBold,
    },
    stateContainer: {
      alignSelf: 'flex-start',
      paddingHorizontal: 15,
      paddingVertical: 3,
      borderRadius: 15,
    },
    registeredContainer: {
      backgroundColor: 'rgba(64, 112, 244, 0.1)',
    },
    activeContainer: {
      backgroundColor: 'rgba(0, 213, 99, 0.1)',
    },
    registered: {
      color: colors.light.ultramarineBlue,
    },
    active: {
      color: colors.light.ufoGreen,
    },
    terminated: {
      color: colors.light.zodiacBlue,
    },
  },
  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
    },
    logoContainer: {
      backgroundColor: colors.dark.whiteSmoke,
    },
    title: {
      color: colors.light.zodiacBlue,
    },
    address: {
      color: colors.light.zodiacBlue,
    },
    value: {
      color: colors.light.zodiacBlue,
    },
    terminated: {
      color: colors.light.zodiacBlue,
    },
  },
  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.mainBg,
    },
    logoContainer: {
      backgroundColor: colors.dark.mainBg,
    },
    address: {
      color: colors.dark.white,
    },
    title: {
      color: colors.dark.white,
    },
    value: {
      color: colors.dark.white,
    },
    terminated: {
      color: colors.light.white,
    },
  },
};
