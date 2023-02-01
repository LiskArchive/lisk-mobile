import { StyleSheet } from 'react-native';

import { colors, boxes } from 'constants/styleGuide';

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.light.white,
    justifyContent: 'space-between',
  },
  footer: {
    padding: boxes.boxPadding,
  },
};

export default StyleSheet.create(styles);
