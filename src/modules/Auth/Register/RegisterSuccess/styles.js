import { StyleSheet } from 'react-native';
import { colors, boxes } from 'constants/styleGuide';

const styles = {
  wrapper: {
    flex: 1,
  },
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: boxes.boxPadding,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  header: {
    marginTop: 8,
    paddingBottom: 8,
  },
  subTitle: {
    color: colors.light.slateGray,
    textAlign: 'center',
    marginTop: 30,
  },
  imageContainer: {
    marginTop: 52,
    alignItems: 'center',
  },
  image: {
    width: 305,
    height: 340,
  },
  footer: {
    padding: boxes.boxPadding,
  },
};

export default StyleSheet.create(styles);
