import { themes, colors, fonts } from 'constants/styleGuide';

export default {
  common: {
    container: {
      overflow: 'hidden',
    },
    switch: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    avatar: {
      marginHorizontal: 10,
      height: 30,
      width: 30,
      borderRadius: 15,
    },
    appName: {
      fontFamily: fonts.family.context,
      fontSize: fonts.size.small,
      marginRight: 10,
    }
  },
  [themes.light]: {
    container: {
      backgroundColor: colors.light.white
    },
    appName: {
      color: colors.light.zodiacBlue
    }
  },
  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.mainBg
    },
    appName: {
      color: colors.dark.white
    }
  },
};
