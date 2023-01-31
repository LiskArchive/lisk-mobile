import React from 'react';
import { Svg, Path } from 'react-native-svg';

import { useTheme } from 'contexts/ThemeContext';
import { themes, colors } from 'constants/styleGuide';

export default function ActivityHistoryIllustrationSvg({ height = 388, width = 219, style }) {
  const { theme } = useTheme();

  const strokeColor = theme === themes.light ? colors.light.zodiacBlue : colors.dark.platinumGray;

  const fillColor = theme === themes.light ? colors.light.platinumGray : colors.dark.volcanicSand;

  return (
    <Svg width={width} height={height} viewBox="0 0 219 388" fill="none" style={style}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.427 386.899H204.752V1.41895H1.427V386.899Z"
        stroke={strokeColor}
        strokeLinecap="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.9 98.2999H190.534V19.4829H16.9V98.2999Z"
        fill={colors.light.ultramarineBlue}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M204.751 386.899H217.573V1.41895H204.751V386.899Z"
        fill={fillColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M204.751 386.899H217.573V1.41895H204.751V386.899Z"
        stroke={strokeColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M120.167 358.995C120.167 367.407 113.348 374.226 104.936 374.226C96.5236 374.226 89.7046 367.407 89.7046 358.995C89.7046 350.583 96.5236 343.764 104.936 343.764C113.348 343.764 120.167 350.583 120.167 358.995Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M91.6368 360.481C91.6368 352.069 98.4558 345.25 106.868 345.25C109.91 345.25 112.737 346.152 115.115 347.688C112.416 345.257 108.855 343.764 104.936 343.764C96.5238 343.764 89.7048 350.583 89.7048 358.995C89.7048 364.365 92.4908 369.076 96.6888 371.788C93.5938 369 91.6368 364.974 91.6368 360.481Z"
        fill={colors.light.ghost}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M77.2081 98.3001C77.2081 113.344 89.4041 125.54 104.449 125.54C119.493 125.54 131.689 113.344 131.689 98.3001C131.689 83.2561 119.493 71.0591 104.449 71.0591C89.4041 71.0591 77.2081 83.2561 77.2081 98.3001Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M77.2081 98.3001C77.2081 113.344 89.4041 125.54 104.449 125.54C119.493 125.54 131.689 113.344 131.689 98.3001C131.689 83.2561 119.493 71.0591 104.449 71.0591C89.4041 71.0591 77.2081 83.2561 77.2081 98.3001Z"
        stroke={strokeColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M104.449 125.54C96.6948 125.54 89.7038 122.295 84.7428 117.096C88.0208 109.457 95.6088 104.104 104.449 104.104C113.289 104.104 120.877 109.457 124.155 117.096C119.194 122.295 112.202 125.54 104.449 125.54Z"
        fill={colors.light.ultramarineBlue}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M104.449 125.54C96.6948 125.54 89.7038 122.295 84.7428 117.096C88.0208 109.457 95.6088 104.104 104.449 104.104C113.289 104.104 120.877 109.457 124.155 117.096C119.194 122.295 112.202 125.54 104.449 125.54Z"
        stroke={strokeColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M97.8741 94.825C97.8741 98.456 100.817 101.4 104.449 101.4C108.08 101.4 111.023 98.456 111.023 94.825C111.023 91.194 108.08 88.25 104.449 88.25C100.817 88.25 97.8741 91.194 97.8741 94.825Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M97.8741 94.825C97.8741 98.456 100.817 101.4 104.449 101.4C108.08 101.4 111.023 98.456 111.023 94.825C111.023 91.194 108.08 88.25 104.449 88.25C100.817 88.25 97.8741 91.194 97.8741 94.825Z"
        stroke={strokeColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M120.167 358.995C120.167 367.407 113.348 374.226 104.936 374.226C96.5236 374.226 89.7046 367.407 89.7046 358.995C89.7046 350.583 96.5236 343.764 104.936 343.764C113.348 343.764 120.167 350.583 120.167 358.995Z"
        stroke={strokeColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M60.4268 162.237C60.4268 169.772 54.3178 175.881 46.7818 175.881C39.2468 175.881 33.1378 169.772 33.1378 162.237C33.1378 154.701 39.2468 148.592 46.7818 148.592C54.3178 148.592 60.4268 154.701 60.4268 162.237Z"
        fill={colors.light.ufoGreen}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M60.4268 239.755C60.4268 247.291 54.3178 253.399 46.7818 253.399C39.2468 253.399 33.1378 247.291 33.1378 239.755C33.1378 232.219 39.2468 226.11 46.7818 226.11C54.3178 226.11 60.4268 232.219 60.4268 239.755Z"
        fill={colors.light.ufoGreen}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M81.539 164.867H134.335V156.212H81.539V164.867Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M81.539 164.867H134.335V156.212H81.539V164.867Z"
        stroke={strokeColor}
      />
      <Path d="M134.335 175.881H81.5385" stroke={strokeColor} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M81.539 239.755H134.335V231.1H81.539V239.755Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M81.539 239.755H134.335V231.1H81.539V239.755Z"
        stroke={strokeColor}
      />
      <Path d="M134.335 250.769H81.5385" stroke={strokeColor} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M162.908 165.274H176.733V155.805H162.908V165.274Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M162.908 165.274H176.733V155.805H162.908V165.274Z"
        stroke={strokeColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M162.908 239.324H176.733V229.856H162.908V239.324Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M162.908 239.324H176.733V229.856H162.908V239.324Z"
        stroke={strokeColor}
      />
      <Path d="M33.1383 198.247H176.733" stroke={fillColor} />
      <Path d="M33.1383 273.884H176.733" stroke={fillColor} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.9 330.582H190.534V19.4819H16.9V330.582Z"
        stroke={strokeColor}
      />
    </Svg>
  );
}
