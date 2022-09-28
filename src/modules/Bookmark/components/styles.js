import { Dimensions } from 'react-native';
import { themes, colors, fonts } from 'constants/styleGuide';
import { setColorOpacity } from 'utilities/helpers';

const Screen = Dimensions.get('window');

export default () => ({
  common: {
    container: {
      paddingRight: 20,
      paddingLeft: 20,
      flex: 1,
    },
    swipeBookmark: {
      paddingHorizontal: 20,
    },
    column: {
      flex: 1,
    },
    emptyView: {
      marginBottom: 40,
    },
    buttonContainer: {
      marginTop: 10,
      paddingVertical: 10,
    },
    buttonText: {
      color: colors.light.ultramarineBlue,
    },
    itemContainer: {
      flex: 1,
      width: '100%',
      paddingTop: 10,
      paddingBottom: 10,
      borderBottomWidth: 1,
    },
    infoButton: {
      padding: 15,
      paddingRight: 0,
    },
    linkedItem: {
      flex: 1,
      width: '100%',
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
      flex: 1,
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
    imageContainer: {
      marginBottom: 10,
    },
    lightOpacity: {
      opacity: 0.5,
    },
    noBookmarkImage: {
      width: 264,
      height: 100,
    },
    emptyTitle: {
      paddingTop: 10,
      textAlign: 'center',
      paddingRight: 40,
      paddingLeft: 40,
      fontSize: fonts.size.base,
      color: colors.light.blueGray,
    },
    icon: {
      marginTop: 15,
    },
    iconButton: {
      width: '100%',
      textAlign: 'center',
    },
    buttonContent: {
      width: '100%',
      textAlign: 'center',
      color: colors.light.white,
    },
    label: {
      flex: 1,
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
      backgroundColor: colors.light.blueGray,
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
      width: '100%',
      paddingVertical: 10,
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
      color: colors.light.white,
    },
    editButton: {
      backgroundColor: colors.light.blueGray,
    },
    text: {
      color: colors.light.black,
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
      color: colors.dark.white,
    },
    editButton: {
      backgroundColor: colors.dark.blueGray,
    },
    text: {
      color: colors.dark.white,
    },
  },
});
