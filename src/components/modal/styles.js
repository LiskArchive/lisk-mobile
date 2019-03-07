import { themes, colors, boxes } from '../../constants/styleGuide';

export default () => ({
  common: {
    wrapper: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.35)',
      // flexFlow: 'row wrap',
      justifyContent: 'flex-end',
    },
    container: {
      // position: 'absolute',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: boxes.boxPadding,
      backgroundColor: '#fff',
      width: '100%',
      bottom: 0,
      // flex: 1,
      left: 0,
    },
  },

  [themes.light]: {
    wrapper: {
      // backgroundColor: colors.light.white,
    },
    subHeader: {
      color: colors.light.gray2,
    },
  },

  [themes.dark]: {
    // wrapper: {
    //   backgroundColor: colors.dark.screenBgNavy,
    // },
    subHeader: {
      color: colors.dark.gray1,
    },
  },
});
