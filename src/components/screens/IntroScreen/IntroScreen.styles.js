import { StyleSheet } from 'react-native';

import { colors, boxes } from 'constants/styleGuide';
import { deviceHeight, SCREEN_HEIGHTS } from 'utilities/device';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.light.white,
    justifyContent: 'space-between',
  },
  footer: {
    padding: boxes.boxPadding,
    height: 88,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  confirmationText: {
    marginLeft: 13.5,
    flex: 1,
    color: colors.light.blueGray,
    flexWrap: 'wrap',
    fontSize: isSmallScreen ? 11 : 13,
  },
  link: {
    color: colors.light.ultramarineBlue,
    fontSize: isSmallScreen ? 11 : 13,
  },
};

export default StyleSheet.create(styles);
