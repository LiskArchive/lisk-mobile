import { Dimensions } from 'react-native';
import { themes, colors, fonts, boxes } from '../../../constants/styleGuide';
import { SCREEN_HEIGHTS, deviceHeight } from '../../../utilities/device';
import { setColorOpacity } from '../../../utilities/helpers';

const Screen = Dimensions.get('window');
const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;

export default () => ({
  common: {
    container: {
      paddingRight: 20,
      paddingLeft: 20,
    },
    itemContainer: {
      flex: 1,
      width: '100%',
      height: 80,
      paddingTop: 20,
      paddingBottom: 20,
      borderBottomWidth: 1,
    },
    linkedItem: {
      flex: 1,
      width: Screen.width - (boxes.boxPadding * 2),
      marginHorizontal: boxes.boxPadding,
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
      marginTop: -2,
      paddingBottom: 4,
    },
    avatarContainer: {
      paddingRight: 15,
    },
    avatar: {
      borderWidth: 1,
    },
    emptyState: {
      marginTop: 0,
      width: '100%',
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageContainer: {
      width: '100%',
      alignItems: 'center',
      marginBottom: 10,
      marginTop: 40,
    },
    noBookmarkImage: {
      width: 264,
      height: 100,
    },
    emptyTitle: {
      paddingTop: isSmallScreen ? 0 : 10,
      textAlign: 'center',
      paddingRight: 40,
      paddingLeft: 40,
      fontSize: isSmallScreen ? fonts.size.small : fonts.size.base,
      color: colors.light.blueGray,
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
      width: 90,
    },
    editButton: {
      position: 'absolute',
      top: 0,
      left: Screen.width - 200,
      width: Screen.width,
      backgroundColor: colors.light.mystic,
      height: 80,
      justifyContent: 'center',
    },
    deleteButton: {
      position: 'absolute',
      top: 0,
      left: Screen.width - 110,
      width: Screen.width,
      height: 80,
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
      color: colors.dark.slateGray,
    },
    itemContainer: {
      borderBottomColor: colors.light.mystic,
    },
    linkedItem: {
      borderBottomColor: colors.light.mystic,
    },
    label: {
      color: colors.light.slateGray,
    },
    avatar: {
      borderColor: colors.light.ghost,
    },
    noResult: {
      color: colors.light.slateGray,
    },
    deleteButton: {
      backgroundColor: colors.light.burntSieanna,
    },
    editContent: {
      color: colors.light.slateGray,
    },
    editButton: {
      backgroundColor: colors.light.mystic,
    },
  },
  [themes.dark]: {
    title: {
      color: colors.dark.white,
    },
    itemContainer: {
      borderBottomColor: setColorOpacity(colors.dark.white, 0.24),
    },
    linkedItem: {
      borderBottomColor: setColorOpacity(colors.dark.white, 0.24),
    },
    address: {
      color: colors.dark.white,
    },
    label: {
      color: colors.dark.slateGray,
    },
    avatar: {
      borderColor: colors.dark.ghost,
    },
    noResult: {
      color: colors.dark.slateGray,
    },
    deleteButton: {
      backgroundColor: colors.dark.burntSieanna,
    },
    editContent: {
      color: colors.dark.slateGray,
    },
    editButton: {
      backgroundColor: colors.dark.mystic,
    },
  },
});
