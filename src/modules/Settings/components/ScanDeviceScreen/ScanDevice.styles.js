import { Dimensions } from 'react-native';
import { themes, colors, boxes, fonts } from 'constants/styleGuide';

const { height } = Dimensions.get('screen');

export default () => ({
  common: {
    container: {
      flex: 1,
    },
    innerContainer: {
      flex: 1,
      paddingTop: boxes.boxPadding,
      paddingLeft: boxes.boxPadding,
      paddingRight: boxes.boxPadding,
    },
    appList: {
      marginTop: 20,
    },
    info: {
      marginBottom: 20,
    },
    description: {
      fontSize: fonts.size.base,
      fontFamily: fonts.family.context,
    },
    illustrationContainer: {
      height: height / 2.2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    harmfulContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    noHarmfulText: {
      textAlign: 'center',
      marginTop: 20,
    },
    scanning: {
      textAlign: 'center',
    },
  },

  [themes.light]: {
    description: {
      color: colors.light.maastrichtBlue,
    },
  },

  [themes.dark]: {
    description: {
      color: colors.dark.platinum,
    },
  },
});
