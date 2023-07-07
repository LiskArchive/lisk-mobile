import React from 'react';
import { Svg, Path } from 'react-native-svg';

import { useTheme } from 'contexts/ThemeContext';
import { themes, colors } from 'constants/styleGuide';

export default function EmptyIllustrationSvg({ height = 55, width = 107, style }) {
  const { theme } = useTheme();

  const fillColorLevel1 = theme === themes.light ? colors.light.white : colors.dark.white;
  const fillColorLevel2 = theme === themes.light ? colors.light.silverGrey : colors.dark.silverGrey;
  const fillColorLevel3 = theme === themes.light ? colors.light.blueGray : colors.dark.blueGray;
  const fillColorLevel4 =
    theme === themes.light ? colors.light.zodiacBlue : colors.dark.ultramarineBlue;

  return (
    <Svg width={width} height={height} viewBox="0 0 107 55" fill="none" style={style}>
      <Path d="M89.829 27.3438H11.7344V39.962H89.829V27.3438Z" fill={fillColorLevel2} />
      <Path d="M38.1699 39.962V27.3438" stroke={fillColorLevel4} strokeMiterlimit="10" />
      <Path
        d="M24.2005 25.0237V15.2193H98.2068V12.9102H21.8535V27.3455H98.2068V25.0237H24.2005Z"
        fill={fillColorLevel2}
      />
      <Path
        d="M95.015 15.2188H24.2012V25.0232H95.015V15.2188Z"
        fill={fillColorLevel1}
        stroke={fillColorLevel4}
        strokeMiterlimit="10"
      />
      <Path
        d="M95.015 18.4883H24.2012V21.7564H95.015V18.4883Z"
        stroke={fillColorLevel4}
        strokeMiterlimit="10"
      />
      <Path d="M48.6797 15.2188V25.0232" stroke={fillColorLevel4} strokeMiterlimit="10" />
      <Path
        d="M89.8412 27.3438H21.9043L23.2671 29.1608H63.7466V39.962H66.0683V29.1608H89.8412V27.3438Z"
        fill={fillColorLevel4}
      />
      <Path d="M106.548 39.9648H0.453125" stroke={fillColorLevel4} strokeMiterlimit="10" />
      <Path
        d="M64.5154 53.2769L59.2157 50.0719L53.916 53.2769V18.4883H64.5154V53.2769Z"
        fill={colors.light.ultramarineBlue}
        stroke={colors.light.ultramarineBlue}
        strokeMiterlimit="10"
      />
      <Path d="M30.0302 0.078125H11.9355V18.1728H30.0302V0.078125Z" fill={fillColorLevel3} />
      <Path
        d="M15.6191 3.76172L26.3573 14.4999"
        stroke={fillColorLevel1}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <Path
        d="M26.3573 3.76172L15.6191 14.4999"
        stroke={fillColorLevel1}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </Svg>
  );
}
