import React from 'react';
import { Svg, Path, Mask, G } from 'react-native-svg';

import { useTheme } from 'contexts/ThemeContext';
import { themes, colors } from 'constants/styleGuide';

export default function EasyAccessIllustrationSvg({ height = 388, width = 381, style }) {
  const { theme } = useTheme();

  const strokeColor = theme === themes.light ? colors.light.zodiacBlue : colors.dark.platinumGray;

  const fillColor = theme === themes.light ? colors.light.platinumGray : colors.dark.volcanicSand;

  return (
    <Svg width={width} height={height} viewBox="0 0 381 388" fill="none" style={style}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M232.831 94.1172H88.1438L75.9048 106.354L319.66 205.422L331.897 193.184L232.831 94.1172Z"
        fill={fillColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M220.593 106.354H75.9055L174.973 205.421H319.66L220.593 106.354Z"
        fill={colors.light.ultramarineBlue}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M220.593 106.354H75.9055L123.083 205.421H231.647L220.593 106.354Z"
        fill={colors.light.inkBlue}
      />
      <Path d="M328.987 195.741L229.92 96.6743H85.233" stroke={strokeColor} />
      <Path d="M323.78 201.193L224.714 102.126H80.026" stroke={strokeColor} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M75.905 253.055H220.434V106.355H75.905V253.055Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M75.905 253.055H220.434V106.355H75.905V253.055Z"
        stroke={strokeColor}
        strokeLinecap="round"
      />
      <Path
        d="M112.632 113.893C105.091 113.893 98.9795 107.78 98.9795 100.24C98.9795 92.6989 105.091 86.5859 112.632 86.5859C117.971 86.5859 122.594 89.6499 124.839 94.1159"
        stroke={strokeColor}
      />
      <Path
        d="M153.768 113.893C146.227 113.893 140.115 107.78 140.115 100.24C140.115 92.6989 146.227 86.5859 153.768 86.5859C159.107 86.5859 163.73 89.6499 165.974 94.1159"
        stroke={strokeColor}
      />
      <Path
        d="M194.903 113.893C187.363 113.893 181.25 107.78 181.25 100.24C181.25 92.6989 187.363 86.5859 194.903 86.5859C200.242 86.5859 204.865 89.6499 207.11 94.1159"
        stroke={strokeColor}
      />
      <Path
        d="M2.92651 387.147H235.255C241.989 387.147 247.448 381.688 247.448 374.954V283.78"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M131.169 165.184V158.349C131.169 156.709 131.401 155.124 131.834 153.624C133.945 146.32 140.827 141.044 148.882 141.399C158.027 141.803 165.062 149.715 165.062 158.881V165.184"
        fill="white"
      />
      <Path
        d="M131.169 165.184V158.349C131.169 156.709 131.401 155.124 131.834 153.624C133.945 146.32 140.827 141.044 148.882 141.399C158.027 141.803 165.062 149.715 165.062 158.881V165.184"
        stroke={strokeColor}
        strokeLinecap="round"
      />
      <Mask
        id="mask0_322_2184"
        style="mask-type:luminance"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="381"
        height="387"
      >
        <Path fillRule="evenodd" clipRule="evenodd" d="M0 387H381V0H0V387Z" fill="white" />
      </Mask>
      <G mask="url(#mask0_322_2184)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M109.487 224.227H170.742V171.184H109.487V224.227Z"
          fill="white"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M117.487 218.227H178.742V165.184H117.487V218.227Z"
          stroke={strokeColor}
          strokeLinecap="round"
        />
        <Path d="M141.253 186.764H155.011" stroke={strokeColor} strokeLinecap="round" />
        <Path d="M148.131 186.764V200.537" stroke={strokeColor} strokeLinecap="round" />
        <Path
          d="M2.92651 1.19971H104.649C109.993 1.19971 114.325 5.53171 114.325 10.8757V46.1247"
          stroke={fillColor}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}
