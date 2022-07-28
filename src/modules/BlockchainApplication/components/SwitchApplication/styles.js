import {
  colors,
  themes,
  boxes
} from 'constants/styleGuide';

export default {
  common: {
    wrapper: {
      flex: 1,
    },
    container: {
      flex: 1,
      paddingVertical: boxes.boxPadding,
    },
    urlContainer: {
      borderWidth: 1,
      borderColor: colors.light.platinumGray,
      padding: 20,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    url: {
      color: colors.light.ultramarineBlue
    },
    modal: {
      height: 300,
      zIndex: 2,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 20,
    },
    title: {
      textAlign: 'center',
      marginBottom: 10,
    },
    bottom: {
      padding: boxes.boxPadding,
      marginBottom: boxes.boxPadding,
    },
    button: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5,
    },
    buttonText: {
      color: colors.light.ultramarineBlue
    },
    icon: {
      width: 30
    },
    outline: {
      borderWidth: 1,
      borderRadius: 5,
      minHeight: 50,
    },
  },
  [themes.light]: {
    outline: {
      borderColor: colors.light.platinumGray,
    },
    wrapper: {
      backgroundColor: colors.dark.white
    },
    remove: {
      color: colors.light.zodiacBlue,
    }
  },

  [themes.dark]: {
    outline: {
      borderColor: colors.light.volcanicSand,
    },
    wrapper: {
      backgroundColor: colors.dark.black
    },
    remove: {
      color: colors.light.white,
    }
  },
};
