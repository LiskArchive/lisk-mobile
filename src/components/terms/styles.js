import { colors, boxes } from '../../constants/styleGuide';

export default () => ({
  common: {
    container: {
      height: '100%',
      backgroundColor: colors.light.white,
    },
    innerContainer: {
      flex: 1,
      flexDirection: 'column',
      marginRight: boxes.boxPadding,
      marginLeft: boxes.boxPadding,
      paddingTop: 36,
      paddingBottom: 35,
    },
    centerAligned: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      marginBottom: 6,
      // lineHeight: 41,
    },
    subTitle: {
      color: colors.light.grayScale2,
    },
    link: {
      color: colors.light.primary5,
      marginTop: 10,
    },
    itemTitle: {
      marginTop: 16,
      lineHeight: 41,
    },
    itemDescription: {
      lineHeight: 22,
      color: colors.light.grayScale2,
    },
  },
});
