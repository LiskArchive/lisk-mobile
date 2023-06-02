import { Platform } from 'react-native';

import { themes, colors, boxes, fonts } from 'constants/styleGuide';

const safeAreaPaddingTop = Platform.OS === 'android' ? 0 : 44;

export default {
  common: {
    flex: {
      flex: 1,
    },
    container: {
      paddingTop: safeAreaPaddingTop,
    },
    resultScreenContainer: {
      paddingBottom: safeAreaPaddingTop,
    },
    header: {
      height: 230,
      position: 'relative',
      overflow: 'hidden',
      paddingTop: safeAreaPaddingTop,
    },
    body: {
      flex: 1,
      paddingLeft: boxes.boxPadding,
      paddingRight: boxes.boxPadding,
    },
    logoContainer: {
      marginTop: -32,
      marginBottom: Platform.select({ ios: -32, android: 10 }),
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
      marginHorizontal: 2,
    },
    title: {
      marginHorizontal: 4,
      textAlign: 'center',
      fontFamily: fonts.family.contextSemiBold,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    projectPageContainer: {
      justifyContent: 'center',
      marginTop: 8,
      marginBottom: 8,
    },
    depositedContainer: {
      justifyContent: 'center',
      marginTop: 8,
    },
    deposited: {
      fontSize: fonts.size.input,
      color: colors.light.blueGray,
      marginRight: 4,
    },
    smallTitle: {
      fontSize: fonts.size.input,
      color: colors.light.blueGray,
      marginBottom: 8,
    },
    amount: {
      color: colors.light.ultramarineBlue,
      fontFamily: fonts.family.contextBold,
      fontSize: fonts.size.input,
    },
    url: {
      fontSize: fonts.size.input,
      marginLeft: 4,
      color: colors.light.ultramarineBlue,
    },
    stats: {
      flex: 1,
      flexDirection: 'row',
      marginTop: 32,
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
    unregisteredContainer: {
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
  },
  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
    },
    logoContainer: {
      backgroundColor: colors.dark.whiteSmoke,
    },
    header: {
      backgroundColor: colors.light.ultramarineBlue,
    },
    title: {
      color: colors.light.zodiacBlue,
    },
    value: {
      color: colors.light.zodiacBlue,
    },
    terminated: {
      color: colors.light.zodiacBlue,
    },
    unregistered: {
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
    header: {
      backgroundColor: colors.light.ultramarineBlue,
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
    unregistered: {
      color: colors.light.white,
    },
  },
};
