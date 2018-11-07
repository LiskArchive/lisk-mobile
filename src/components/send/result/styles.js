import { Dimensions } from 'react-native';
import { boxes, colors } from '../../../constants/styleGuide';

const { height } = Dimensions.get('window');
export default () => ({
  common: {
    container: {
      height: '100%',
      backgroundColor: colors.white,
    },
    innerContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      flex: 1,
      backgroundColor: boxes.white,
      paddingRight: boxes.boxPadding,
      paddingLeft: boxes.boxPadding,
      paddingTop: 37,
      paddingBottom: 35,
    },
    button: {
      marginTop: 20,
      backgroundColor: boxes.success1,
    },
    title: {
      fontSize: 30,
      marginBottom: 20,
    },
    heading: {
      fontSize: 24,
      paddingBottom: 80,
    },
    subtitle: {
      marginTop: 7,
      color: colors.grayScale2,
    },
    illustration: {
      width: '100%',
      height: height <= 640 ? 200 : 300,
      paddingBottom: 50,
    },
  },
});
