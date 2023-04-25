import { colors } from 'constants/styleGuide';

export default function getPasswordSetupSuccessStyles() {
  return {
    common: {
      illustration: {
        padding: 20,
      },
      downloadFileContainer: {
        flex: 0,
      },
      footer: {
        width: '100%',
        marginTop: 20,
      },
      checkBox: {
        marginBottom: 20,
      },
      text: {
        color: colors.light.smoothGray,
      },
    },
  };
}
