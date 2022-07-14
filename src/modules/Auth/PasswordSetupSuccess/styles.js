import {
  themes, colors, fonts
} from 'constants/styleGuide';

export default () => ({
  common: {
    downloadFile: {
      flexDirection: 'row',
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    file: {
      paddingHorizontal: 10
    },
    text: {
      fontFamily: fonts.family.heading,
      fontSize: fonts.size.small
    },
    download: {
      fontFamily: fonts.family.heading,
      fontSize: fonts.size.base,
    },
    downloadButton: {
      paddingHorizontal: 40,
      paddingVertical: 10,
      alignSelf: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    }
  },

  [themes.light]: {
    download: {
      color: colors.light.ultramarineBlue
    },
    text: {
      color: colors.light.zodiacBlue
    },
    wrapper: {
      backgroundColor: colors.light.white,
    },
    title: {
      color: colors.light.zodiacBlue,
    },
    description: {
      color: colors.light.zodiacBlue,
    },
  },

  [themes.dark]: {
    text: {
      color: colors.light.white
    },
    download: {
      color: colors.light.ultramarineBlue
    },
    wrapper: {
      backgroundColor: colors.dark.mainBg,
    },
    title: {
      color: colors.dark.ghost,
    },
    description: {
      color: colors.dark.ghost,
    },
  },
});
