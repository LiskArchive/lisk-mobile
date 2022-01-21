import { colors } from '../../../constants/styleGuide';
import { deviceHeight } from '../../../utilities/device';

const height = deviceHeight();

export default () => ({
  common: {
    container: {
      flex: 1,
      paddingTop: height > 700 ? 50 : 20
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 20
    },
    svgContainer: {
      padding: 10
    },
    title: {
      textAlign: 'center',
      color: colors.light.white,
      padding: 20
    },
    readMoreButton: {
      marginBottom: 20,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10
    },
    icon: {
      paddingLeft: 10
    },
    readMoreText: {
      color: colors.light.white
    },
    gotItText: {
      color: colors.light.ultramarineBlue
    },
    gotItButton: {
      backgroundColor: colors.light.white
    }
  }
});
