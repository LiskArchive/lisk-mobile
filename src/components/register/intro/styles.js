import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/styleGuide';

const liskIdIconColor = '#9cb4fa';
const avatarIconColor = '#a9dcf8';
const secureIconColor = '#fe7354';

const styles = {
  container: {
    flexDirection: 'column',
    marginRight: 20,
    marginLeft: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 8,
  },
  subHeader: {
    marginTop: 14,
    marginBottom: 25,
    color: colors.grayScale1,
  },
  row: {
    flexDirection: 'row',
    paddingRight: 50,
    marginBottom: 23,
  },
  rowTitle: {
    marginTop: 5,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 50,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  color1: {
    backgroundColor: liskIdIconColor,
  },
  color2: {
    backgroundColor: avatarIconColor,
  },
  color3: {
    backgroundColor: secureIconColor,
  },
  description: {
    color: colors.grayScale2,
    marginTop: 5,
  },
  label: {
    color: colors.grayScale2,
    marginLeft: 12,
  },
};

export default StyleSheet.create(styles);
