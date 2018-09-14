import { StyleSheet } from 'react-native';
import { colors, boxes } from '../../constants/styleGuide';

const logoSize = 83;

const styles = {
  container: {
    height: '100%',
    backgroundColor: colors.white,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: boxes.boxPadding,
    marginLeft: boxes.boxPadding,
    paddingTop: 36,
    paddingBottom: 35,
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  copy: {
    color: colors.grayScale2,
    width: 'auto',
  },
  version: {
    color: colors.grayScale2,
  },
  centerAligned: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    overflow: 'hidden',
    width: logoSize,
    height: logoSize,
    borderRadius: 18,
    marginTop: 20,
  },
  logoImage: {
    width: logoSize,
    height: logoSize,
  },
  appTitle: {
    marginTop: 18,
    marginBottom: 6,
  },
  link: {
    color: colors.primary5,
    marginTop: 10,
  },
};

export default StyleSheet.create(styles);
