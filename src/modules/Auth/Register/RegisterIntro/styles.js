import { StyleSheet } from 'react-native';

import { boxes } from 'constants/styleGuide';

const styles = {
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
    padding: boxes.boxPadding,
    height: 88,
  },
};

export default StyleSheet.create(styles);
