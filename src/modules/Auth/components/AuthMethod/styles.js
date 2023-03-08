import { colors, themes, boxes, fonts } from 'constants/styleGuide';

export default () => ({
  common: {
    container: {
      flex: 1,
    },
    body: {
      flex: 1,
      paddingLeft: boxes.boxPadding,
      paddingRight: boxes.boxPadding,
    },
    title: {
      textAlign: 'center',
      marginTop: 40,
      marginBottom: 8,
    },
    derivationPath: {
      fontFamily: fonts.family.regular,
      fontSize: fonts.size.base,
      paddingLeft: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    footer: {
      padding: boxes.boxPadding,
    },
  },
  [themes.light]: {
    container: {
      backgroundColor: colors.dark.white,
    },
    title: {
      color: colors.light.zodiacBlue,
    },
    derivationPath: {
      color: colors.light.smoothGray,
    },
  },
  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.black,
    },
    title: {
      color: colors.dark.white,
    },
    derivationPath: {
      color: colors.light.mountainMist,
    },
  },
});
