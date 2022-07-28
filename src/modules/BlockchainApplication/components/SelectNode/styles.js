import { colors, themes } from "constants/styleGuide";

export default {
  common: {
    urlContainer: {
      borderWidth: 1,
      borderColor: colors.light.platinumGray,
      padding: 20,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    url: {
      color: colors.light.ultramarineBlue,
    },
  },
  [themes.light]: {},

  [themes.dark]: {},
};
