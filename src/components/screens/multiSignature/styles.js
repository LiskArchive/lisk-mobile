import { themes, colors, fonts } from '../../../constants/styleGuide';
import { setColorOpacity } from '../../../utilities/helpers';

export default () => ({
  common: {
    container: {
      padding: 20
    },
    header: {
      paddingTop: 20,
    },
    copy: {
      fontSize: fonts.size.base,
      marginBottom: 10,
    },
    row: {
      flexDirection: 'row'
    },
    infoContainer: {
      paddingTop: 15,
    },
    signatureList: {
      paddingVertical: 10,
      alignItems: 'center'
    },
    signatureListContainer: {
      marginTop: 20,
      borderBottomWidth: 1,
      paddingBottom: 15,
      marginBottom: 10,
    },
    requiredTitle: {
      marginVertical: 10,
    },
    detailsContainer: {
      paddingHorizontal: 10,
    },
    avatarContainer: {
      paddingLeft: 10,
    },
    moreButton: {
      paddingLeft: 25,
      paddingTop: 10,
      marginBottom: 10,
    },
    number: {
      width: 25,
    }
  },
  [themes.light]: {
    container: {
      backgroundColor: colors.light.white,
      flex: 1,
    },
    copy: {
      color: colors.light.zodiacBlue
    },
    light: {
      color: colors.light.blueGray
    },
    signatureListContainer: {
      borderBottomColor: setColorOpacity(colors.light.black, 0.15)
    },
    moreButton: {
      color: colors.light.ultramarineBlue
    }
  },
  [themes.dark]: {
    container: {
      backgroundColor: colors.dark.black,
      flex: 1,
    },
    copy: {
      color: colors.dark.white
    },
    light: {
      color: colors.light.mountainMist
    },
    signatureListContainer: {
      borderBottomColor: setColorOpacity(colors.dark.white, 0.3)
    },
    moreButton: {
      color: colors.dark.ultramarineBlue
    }
  }
});
