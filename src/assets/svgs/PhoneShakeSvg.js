import React from 'react';
import { Svg, Path } from 'react-native-svg';

import { useTheme } from 'contexts/ThemeContext';
import { themes, colors } from 'constants/styleGuide';

export default function PhoneShakeSvg({ height = 20, width = 20, style }) {
  const { theme } = useTheme();

  const strokeColor = theme === themes.light ? colors.light.blueGray : colors.dark.slateGray;

  return (
    <Svg
      width={width}
      height={height}
      style={style}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M8.375 2H12.5C12.5 2 14.75 2 14.75 4.25V14.375C14.75 14.375 14.75 16.625 12.5 16.625H8.375C8.375 16.625 6.125 16.625 6.125 14.375V4.25C6.125 4.25 6.125 2 8.375 2Z"
        stroke={strokeColor}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.125 12.875H14.75"
        stroke={strokeColor}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2 11.9375L3.5 10.625L2 9.3125L3.5 8L2 6.6875L3.5 5.375L2 4.0625"
        stroke={strokeColor}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.875 11.9375L17.375 10.625L18.875 9.3125L17.375 8L18.875 6.6875L17.375 5.375L18.875 4.0625"
        stroke={strokeColor}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
