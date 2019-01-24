import { StyleSheet } from 'react-native';
import { SCREEN_HEIGHTS, deviceHeight } from '../../../utilities/device';
import { colors } from '../../../constants/styleGuide';

const isSmallDevice = deviceHeight() < SCREEN_HEIGHTS.SM;
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
    paddingBottom: 8,
  },
  subHeader: {
    marginTop: 8,
    marginBottom: 25,
    color: colors.light.gray2,
  },
  subTitle: {
    color: colors.light.gray2,
  },
  imageContainer: {
    marginTop: 52,
    alignItems: 'center',
  },
  image: {
    width: isSmallDevice ? 130 : 198,
    height: isSmallDevice ? 130 : 198,
  },
  buttonWrapper: {
    paddingBottom: 20,
  },
};

export default StyleSheet.create(styles);
