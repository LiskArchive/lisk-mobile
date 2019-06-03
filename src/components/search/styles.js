import { colors, boxes } from '../../constants/styleGuide';

export default () => ({
  common: {
    title: {
      color: colors.light.black,
    },
    input: {
      color: colors.light.slateGray,
    },
    button: {
      marginTop: 20,
      backgroundColor: colors.light.burntSieanna,
      marginRight: boxes.boxPadding,
      marginLeft: boxes.boxPadding,
    },
    errorMessage: {
      fontSize: 14,
      height: 26,
    },
  },
});
