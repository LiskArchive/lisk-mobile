import { Dimensions } from 'react-native';
import { themes, colors, fonts } from '../../constants/styleGuide';
import { SCREEN_HEIGHTS, deviceHeight } from '../../utilities/device';

const Screen = Dimensions.get('window');
const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;

export default () => ({
  common: {
    container: {
      paddingRight: 20,
      paddingLeft: 20,
      paddingTop: isSmallScreen ? 10 : 20,
    },
    itemContainer: {
      flex: 1,
      width: '100%',
      height: 90,
      paddingTop: 20,
      paddingBottom: 20,
      borderBottomWidth: 1,
    },
    linkedItem: {
      flex: 1,
      width: '100%',
      height: 90,
      paddingTop: 20,
      paddingBottom: 20,
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'stretch',
    },
    innerContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    title: {
      marginBottom: 0,
      fontWeight: 'bold',
    },
    nativeList: {
      marginTop: 0,
      borderTopWidth: 0,
    },
    address: {
      paddingTop: 4,
      paddingBottom: 4,
    },
    avatarContainer: {
      paddingRight: 15,
    },
    avatar: {
      borderWidth: 1,
    },
    emptyState: {
      marginTop: 20,
      width: '100%',
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    noActivity: {
      width: '100%',
      alignItems: 'center',
      marginBottom: 10,
    },
    emptyImage: {
      width: isSmallScreen ? 50 : 80,
      height: isSmallScreen ? 50 : 80,
    },
    emptyTitle: {
      paddingTop: isSmallScreen ? 0 : 10,
      textAlign: 'center',
      paddingRight: 40,
      paddingLeft: 40,
      fontSize: isSmallScreen ? fonts.size.small : fonts.size.base,
    },
    icon: {
      marginTop: 15,
    },
    iconButton: {
      marginBottom: 10,
      width: '100%',
      textAlign: 'center',
    },
    buttonContent: {
      width: '100%',
      textAlign: 'center',
      color: colors.light.white,
    },
    noResult: {
      marginTop: 11,
    },
    button: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'column',
      width: 110,
    },
    editButton: {
      position: 'absolute',
      top: 0,
      left: Screen.width - 240,
      width: Screen.width,
      height: 90,
      backgroundColor: colors.light.sendBalanceBg,
      justifyContent: 'center',
    },
    deleteButton: {
      position: 'absolute',
      top: 0,
      left: Screen.width - 130,
      width: Screen.width,
      height: 90,
      justifyContent: 'center',
    },
    longTitle: {
      paddingLeft: 4,
    },
    draggableRow: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      backgroundColor: 'transparent',
      height: 75,
      width: '100%',
    },
    row: {
      left: 0,
      right: 0,
      height: 60,
      width: '100%',
    },
  },
  [themes.light]: {
    title: {
      color: colors.dark.gray2,
    },
    itemContainer: {
      borderBottomColor: colors.light.gray5,
    },
    linkedItem: {
      borderBottomColor: colors.light.gray5,
    },
    emptyState: {
      backgroundColor: colors.light.white,
    },
    label: {
      color: colors.light.gray1,
    },
    avatar: {
      borderColor: colors.light.white,
    },
    emptyTitle: {
      color: colors.light.gray2,
    },
    noResult: {
      color: colors.light.gray2,
    },
    deleteButton: {
      backgroundColor: colors.light.actionRed,
    },
    editContent: {
      color: colors.light.gray1,
    },
    editButton: {
      backgroundColor: colors.light.sendBalanceBg,
    },
  },
  [themes.dark]: {
    title: {
      color: colors.dark.white,
    },
    itemContainer: {
      borderBottomColor: colors.dark.gray5,
    },
    linkedItem: {
      borderBottomColor: colors.dark.gray5,
    },
    emptyState: {
      backgroundColor: colors.dark.gray5,
    },
    address: {
      color: colors.dark.white,
    },
    label: {
      color: colors.dark.gray4,
    },
    avatar: {
      borderColor: colors.dark.gray5,
    },
    emptyTitle: {
      color: colors.dark.gray2,
    },
    noResult: {
      color: colors.dark.gray2,
    },
    deleteButton: {
      backgroundColor: colors.dark.actionRed,
    },
    editContent: {
      color: colors.dark.gray1,
    },
    editButton: {
      backgroundColor: colors.dark.sendBalanceBg,
    },
  },
});
