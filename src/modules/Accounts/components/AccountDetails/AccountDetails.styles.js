import { boxes } from 'constants/styleGuide';

export default function getAccountDetailsStyles() {
  return {
    common: {
      container: {
        padding: boxes.boxPadding,
      },
      tokenListContainer: {
        marginTop: 32,
      },
      transactionListContainer: {
        marginTop: 16,
      },
    },
  };
}
