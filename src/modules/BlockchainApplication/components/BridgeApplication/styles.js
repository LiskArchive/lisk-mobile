import { boxes, colors } from 'constants/styleGuide';
import { setColorOpacity } from 'utilities/helpers';

export default {
  common: {
    container: {
      padding: boxes.boxPadding,
    },
    title: {
      textAlign: 'center',
      marginBottom: 10,
    },
    description: {
      textAlign: 'center',
      color: setColorOpacity(colors.light.zodiacBlue, 0.7),
    },
    inputContainer: {
      paddingVertical: boxes.boxPadding,
    },
  },
};
