import {
  themes, boxes, colors, fonts
} from '../../../../../constants/styleGuide';

export default () => ({
  common: {
    container: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      flex: 1,
      backgroundColor: boxes.white,
      padding: boxes.boxPadding
    },
    subtitle: {
      textAlign: 'center'
    },
    title: {
      textAlign: 'center',
      fontSize: fonts.size.h4,
      marginBottom: 10
    },
    illustrationContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 50
    },
    illustration: {
      marginBottom: 20
    },
    button: {
      marginTop: 20
    },
    anchor: {
      color: colors.light.ultramarineBlue,
      fontWeight: '600',
      alignSelf: 'center'
    }
  },
  [themes.light]: {
    container: {
      backgroundColor: colors.light.white
    },
    subtitle: {
      color: colors.light.slateGray
    }
  },
  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.mainBg
    },
    subtitle: {
      color: colors.dark.ghost
    }
  }
});
