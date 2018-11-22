import { themes, colors } from '../../constants/styleGuide';

export default () => ({
  common: {
    container: {
      paddingRight: 20,
      paddingLeft: 20,
      paddingTop: 20,
    },
    itemContainer: {
      width: '100%',
      height: 90,
      paddingTop: 20,
      paddingBottom: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      borderBottomWidth: 1,
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
    empty: {
      width: 222,
      height: 109,
    },
    emptyTitle: {
      paddingTop: 10,
    },
    icon: {
      marginTop: 15,
    },
  },
  [themes.light]: {
    itemContainer: {
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
      textAlign: 'center',
      paddingRight: 40,
      paddingLeft: 40,
    },
  },
  [themes.dark]: {
    title: {
      color: colors.dark.white,
    },
    itemContainer: {
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
  },
});
