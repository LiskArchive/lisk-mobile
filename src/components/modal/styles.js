import { themes, colors, boxes } from '../../constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      flex: 1,
      backgroundColor: 'transparent',
      justifyContent: 'flex-end',
    },
    overlay: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      opacity: 0,
    },
    container: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      // backgroundColor: '#fff',
      width: '100%',
      bottom: 0,
      left: 0,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      overflow: 'hidden',
    },
    titleContainer: {
      borderBottomWidth: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: 50,
      zIndex: 2,
      flexDirection: 'column',
      justifyContent: 'flex-end',

    },
    title: {
      paddingTop: 15,
      paddingBottom: 15,
      width: '100%',
      textAlign: 'center',
    },
    closeButton: {
      position: 'absolute',
      left: 0,
      top: 8,
      zIndex: 2,
    },
    contentContainer: {
      padding: boxes.boxPadding,
      paddingTop: boxes.boxPadding + 50,
    },
  },
  [themes.light]: {
    overlay: {
      backgroundColor: 'rgba(0,0,0,1)',
    },
    container: {
      backgroundColor: colors.light.white,
    },

    titleContainer: {
      borderBottomColor: colors.light.gray5,
    },
    title: {
      backgroundColor: colors.light.navigationBg,
      color: colors.light.black,
    },
  },
  [themes.dark]: {
    overlay: {
      backgroundColor: 'rgba(0,0,0,1)',
    },
    container: {
      backgroundColor: colors.dark.screenBgNavy,
    },
    subHeader: {
      color: colors.dark.gray1,
    },
    titleContainer: {
      borderBottomColor: colors.dark.gray5,
    },
    title: {
      backgroundColor: colors.dark.navigationBg,
      color: colors.dark.white,
    },
  },
});
