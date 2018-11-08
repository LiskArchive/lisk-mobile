import { colors, boxes } from '../../constants/styleGuide';

export default ({ logoSize }) => ({
  common: {
    container: {
      height: '100%',
      backgroundColor: colors.light.white,
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
      color: colors.light.gray2,
      width: 'auto',
    },
    version: {
      color: colors.light.gray2,
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
      color: colors.light.blue,
      marginTop: 10,
    },
  },
});
