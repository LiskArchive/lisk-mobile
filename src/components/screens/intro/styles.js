import { StyleSheet } from 'react-native';
import { colors, boxes } from '../../../constants/styleGuide';
import { deviceHeight, SCREEN_HEIGHTS } from '../../../utilities/device';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;

const styles = {
  container: {
    backgroundColor: colors.light.white,
  },
  wrapper: {
    backgroundColor: colors.light.white,
    height: '100%',
  },
  splashContainer: {
    backgroundColor: colors.light.white,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 0,
    width: '100%',
    height: '100%',
  },
  splashBg: {
    backgroundColor: colors.light.ultramarineBlue,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 0,
    width: '100%',
    height: '100%',
  },
  splashTopButtons: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 375,
    height: 97,
    zIndex: 3,
  },
  splashFigure: {
    height: 60,
    width: 153,
    left: '50%',
    marginLeft: -76,
    position: 'absolute',
  },
  splashStatic: {
    zIndex: 2,
    top: (deviceHeight() / 2) - 80,
  },
  splashAnimating: {
    zIndex: 1,
    top: '50%',
    marginTop: -30,
  },
  splashImage: {
    height: 60,
    width: 153,
  },
  splashDescription: {
    height: 60,
    width: '80%',
    left: '10%',
    top: (deviceHeight() / 2) + 20,
    position: 'absolute',
    textAlign: 'center',
  },
  splashDescriptionP: {
    color: colors.light.slateGray,
    textAlign: 'center',
  },
  headingContainer: {
    flex: 1,
  },
  descriptionWrapper: {
    paddingTop: 30,
    paddingBottom: boxes.boxPadding,
    paddingHorizontal: boxes.boxPadding,
    minHeight: 155,
    width: '100%',
  },
  centralized: {
    width: '100%',
    textAlign: 'center',
  },
  descriptionP: {
    color: colors.light.blueGray,
    paddingTop: 10,
  },
  descriptionH: {
    color: colors.light.maastrichtBlue,
  },
  step: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: 300,
    width: '100%',
    backgroundColor: colors.light.white,

  },
  illustrationWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
    bottom: 140,
  },
  illustration: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
    height: null,
  },
  dot: {
    borderWidth: 1,
    borderColor: colors.light.ghost,
  },
  headingPagination: {
    top: 140,
    position: 'absolute',
    height: 13,
  },
  switchContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  confirmationText: {
    marginLeft: 13.5,
    marginBottom: 13.5,
    flex: 1,
    color: colors.light.blueGray,
    flexWrap: 'wrap',
    fontSize: isSmallScreen ? 11 : 13,
  },
  link: {
    color: colors.light.ultramarineBlue,
    fontSize: isSmallScreen ? 11 : 13,
  },
  buttonContainer: {
    zIndex: 10,
    width: '100%',
    alignItems: 'stretch',
    position: 'absolute',
    bottom: 20,
  },
  button: {
    marginHorizontal: 20,
    marginRight: 20,
  },
};

export default StyleSheet.create(styles);
