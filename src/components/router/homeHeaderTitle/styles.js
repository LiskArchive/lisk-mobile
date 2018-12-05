import { fonts, themes, colors } from '../../../constants/styleGuide';

export default () => ({
  common: {
    container: {
      height: 30,
      marginTop: -10,
    },
    wrapper: {
      marginTop: -30,
      flexDirection: 'row',
      justifyContent: 'center',
      textAlign: 'center',
      alignItems: 'center',
    },
    main: {
      fontSize: 16,
      textAlign: 'center',
      fontFamily: fonts.family.heading,
      lineHeight: 30,
      height: 30,
      margin: 0,
    },
    avatar: {
      marginRight: 12,
    },
  },
  [themes.light]: {
    main: {
      color: colors.light.black,
    },
  },
  [themes.dark]: {
    main: {
      color: colors.dark.white,
    },
  },
});
