import {
  themes, colors, boxes, fonts
} from 'constants/styleGuide';

export default () => ({
  common: {
    container: {
      flexDirection: 'row',
      padding: boxes.boxPadding,
      borderWidth: 1,
      borderColor: colors.light.platinumGray,
      borderRadius: 10,
      marginVertical: 10
    },
    avatar: {
      marginRight: 15,
    },
    username: {
      fontFamily: fonts.family.contextSemiBold,
      marginBottom: 5,
      fontSize: fonts.size.base,
    },
    address: {
      fontSize: 14,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
    }
  },

  [themes.light]: {
    wrapper: {
      backgroundColor: colors.light.white,
    },
    username: {
      color: colors.light.zodiacBlue,
    },
    address: {
      color: colors.light.blueGray
    }
  },

  [themes.dark]: {
    wrapper: {
      backgroundColor: colors.dark.mainBg,
    },
    username: {
      color: colors.dark.ghost,
    },
    address: {
      color: colors.light.whiteSmoke
    }
  },
});
