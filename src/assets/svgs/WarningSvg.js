import React from 'react';
import { Svg, Path } from 'react-native-svg';

import { useTheme } from 'contexts/ThemeContext';
import { themes, colors } from 'constants/styleGuide';

export default function WarningSvg({
  color: baseColor = colors.light.zodiacBlue,
  height = 20,
  width = 20,
  style,
  variant = 'fill',
}) {
  const { theme } = useTheme();

  let children;

  const color =
    baseColor || theme === themes.light ? colors.light.zodiacBlue : colors.dark.platinumGray;

  switch (variant) {
    case 'fill':
      children = (
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.32345 1C8.09918 -0.333333 10.0385 -0.333333 10.8142 1L17.7958 13C18.5716 14.3333 17.6019 16 16.0504 16H2.08726C0.535801 16 -0.433863 14.3333 0.341868 13L7.32345 1ZM8.41378 5.65501C8.41378 5.29326 8.70704 5 9.06879 5C9.43054 5 9.7238 5.29326 9.7238 5.65501V10.345C9.7238 10.7067 9.43054 11 9.06879 11C8.70704 11 8.41378 10.7067 8.41378 10.345V5.65501ZM8.41378 12.65C8.41378 12.291 8.7098 12 9.06879 12C9.42777 12 9.7238 12.291 9.7238 12.65C9.7238 13.009 9.42777 13.3 9.06879 13.3C8.7098 13.3 8.41378 13.009 8.41378 12.65Z"
          fill={color}
        />
      );
      break;

    case 'outline':
      children = (
        <>
          <Path
            d="M9.35004 7.65C9.35004 7.29101 9.64105 7 10 7C10.359 7 10.65 7.29101 10.65 7.65V12.35C10.65 12.709 10.359 13 10 13C9.64105 13 9.35004 12.709 9.35004 12.35V7.65Z"
            fill={color}
          />
          <Path
            d="M9.35004 14.65C9.35004 14.291 9.64105 14 10 14C10.359 14 10.65 14.291 10.65 14.65C10.65 15.009 10.359 15.3 10 15.3C9.64105 15.3 9.35004 15.009 9.35004 14.65Z"
            fill={color}
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.32345 3C9.09918 1.66667 11.0385 1.66667 11.8142 3L18.7958 15C19.5716 16.3333 18.6019 18 17.0504 18H3.08726C1.5358 18 0.566137 16.3333 1.34187 15L8.32345 3ZM10.6797 3.65L17.6613 15.65C17.9328 16.1167 17.5934 16.7 17.0504 16.7H3.08726C2.54425 16.7 2.20487 16.1167 2.47638 15.65L9.45796 3.65C9.72946 3.18333 10.4082 3.18333 10.6797 3.65Z"
            fill={color}
          />
        </>
      );
      break;

    default:
      break;
  }

  return (
    <Svg width={width} height={height} style={style} viewBox="0 0 19 16" fill="none">
      {children}
    </Svg>
  );
}
