import { themes, colors, boxes } from '../../constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      flex: 1,
    },
    container: {
      height: '100%',
    },
    innerContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      flex: 1,
      paddingBottom: 60,
    },
    subHeader: {
      margin: boxes.boxPadding,
    },
    main: {
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingLeft: boxes.boxPadding,
      paddingRight: boxes.boxPadding,
    },
    address: {
      marginBottom: 15,
    },
    shareContent: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    shareTextContainer: {
      marginTop: 15,
      flexDirection: 'row',
      alignItems: 'center',
    },
    shareText: {
      marginRight: 5,
    },
    fieldset: {
      height: 100,
    },
    input: {
      flex: 1,
    },
  },

  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
    innerContainer: {
      backgroundColor: colors.light.white,
    },
    subHeader: {
      color: colors.light.gray2,
    },
    address: {
      color: '#263344',
    },
    shareText: {
      color: colors.light.blue,
    },
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.screenBgNavy,
    },
    innerContainer: {
      backgroundColor: colors.dark.screenBgNavy,
    },
    subHeader: {
      color: colors.dark.gray4,
    },
    address: {
      color: colors.dark.white,
    },
    shareText: {
      color: colors.dark.blue,
    },
  },
});
