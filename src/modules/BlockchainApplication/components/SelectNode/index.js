/* eslint-disable max-len */
import React from "react";
import { TouchableOpacity } from "react-native";
import { P } from "components/shared/toolBox/typography";
import { useTheme } from "hooks/useTheme";
import { colors, themes } from "constants/styleGuide";
import CaretSvg from "assets/svgs/CaretSvg";
import getStyles from "./styles";

const UrlItem = ({ application, onPress }) => {
  const { styles } = useTheme({ styles: getStyles });

  const {
    apis: { rest: restApis },
  } = application;

  return restApis.map((rest) => (
    <TouchableOpacity style={styles.urlContainer} onPress={onPress} key={rest}>
      <P style={styles.url}>{rest}</P>
      <CaretSvg direction={"left"} color={colors.light.ultramarineBlue} />
    </TouchableOpacity>
  ));
};

export default UrlItem;
