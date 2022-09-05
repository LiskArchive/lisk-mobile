import { themes, colors, boxes } from 'constants/styleGuide';

export default function getSendTokenSelectApplicationsStepStyles() {
  return {
    common: {
      wrapper: {
        flex: 1,
        paddingLeft: boxes.boxPadding,
        paddingRight: boxes.boxPadding
      },
      container: {
        flex: 1,
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      applicationLogoImage: {
        borderRadius: 50,
        width: 24,
        height: 24,
        marginLeft: 8,
        borderWidth: 1,
        borderColor: colors.light.platinumGray,
      },
      accountAddress: {
        marginLeft: 8,
        color: colors.light.blueGray
      },
      text: {
        color: colors.light.blueGray
      },
      placeholder: {
        fontSize: 16,
        color: colors.light.ghost,
        fontWeight: '400'
      }
    },
    [themes.light]: {
      wrapper: {
        backgroundColor: colors.light.white,
      },
      accountAddress: {
        color: colors.light.blueGray
      },
      text: {
        color: colors.light.zodiacBlue
      }
    },
    [themes.dark]: {
      wrapper: {
        backgroundColor: colors.dark.mainBg,
      },
      accountAddress: {
        color: colors.light.whiteSmoke
      },
      text: {
        color: colors.light.whiteSmoke
      }
    },
  };
}

export const sendTokenRecipientAccountFieldStyles = {
  containerStyle: {
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
    marginBottom: 16,
    marginTop: 16,
  },
  inputLabel: {
    marginBottom: 8
  },
  input: {
    padding: 16
  }
};
