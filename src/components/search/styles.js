import { colors, boxes } from '../../constants/styleGuide';

export default () => ({
  common: {
    title: {
      color: colors.black,
    },
    input: {
      color: colors.grayScale1,
    },
    button: {
      marginTop: 20,
      backgroundColor: colors.action4,
      marginRight: boxes.boxPadding,
      marginLeft: boxes.boxPadding,
    },
    errorMessage: {
      fontSize: 14,
      height: 26,
    },
  },
});
