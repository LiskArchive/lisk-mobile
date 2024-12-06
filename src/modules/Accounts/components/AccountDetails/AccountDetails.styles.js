import { boxes } from 'constants/styleGuide';

export default function getAccountDetailsStyles() {
  return {
    common: {
      container: {
        padding: boxes.boxPadding,
      },
      migrateToL2Card: {
        marginTop: 16,
      },
    },
  };
}
