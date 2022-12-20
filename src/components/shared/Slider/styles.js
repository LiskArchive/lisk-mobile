import { colors, boxes } from 'constants/styleGuide';
import { deviceHeight, SCREEN_HEIGHTS } from 'utilities/device';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;

export default function getSliderStyles() {
  return {
    common: {
      container: {
        flex: 1,
        paddingBottom: 20,
      },
      flex: {
        flex: 1,
      },
      imageSrc: {
        flex: 1,
        resizeMode: 'contain',
      },
      descriptionContainer: {
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
      pagination: {
        top: 140,
        position: 'absolute',
        height: 13,
      },
      switchContainer: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 13.5,
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
      footer: {
        zIndex: 10,
        width: '100%',
        margin: 10,
      },
      button: {
        marginHorizontal: 20,
        marginRight: 20,
      },
    },
  };
}
