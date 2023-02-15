import { boxes } from 'constants/styleGuide';

export default () => ({
  common: {
    flex: {
      flex: 1,
    },
    body: {
      padding: boxes.boxPadding,
    },
    topContainer: {
      marginLeft: 20,
      marginRight: 60,
      marginTop: 10,
    },
    discreteContainer: {
      marginRight: 10,
    },
    row: {
      flexDirection: 'row',
    },
    alignItemsCenter: {
      alignItems: 'center',
    },
  },
});
