import { colors, boxes } from '../../../../constants/styleGuide';
import { isSmallDevice } from '../../../../utilities/device';


export default () => ({
  common: {
    container: {
      height: '100%',
      paddingTop: isSmallDevice ? 140 : 180,
    },
    waves: {
      width: '100%',
      height: '100%',
      borderBottomColor: 'transparent',
      borderBottomWidth: 260,
      marginBottom: -260,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    authTypeIcon: {
      zIndex: 2,
    },
    linkWrapper: {
      width: '100%',
      justifyContent: 'center',
      paddingBottom: 20,
    },
    column: {
      flex: 1,
      flexDirection: 'column',
    },
    question: {
      color: colors.light.slateGray,
      textAlign: 'center',
      marginRight: 4,
      marginBottom: 5,
    },
    fillWidth: {
      width: '100%',
    },
    error: {
      color: colors.light.burntSieanna,
    },
    invisible: {
      color: 'transparent',
    },
    button: {
      height: 47,
      marginHorizontal: boxes.boxPadding,
    },
    buttonManualSignIn: {
      margin: boxes.boxPadding - 4,
    },
  },
});
