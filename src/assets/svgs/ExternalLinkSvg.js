import React from 'react';
import { Svg, Path } from 'react-native-svg';

import colors from '../../constants/styleGuide/colors';

export default function ExternalLinkSvg({ size = 1, color = colors.dark.ultramarineBlue, style }) {
  return (
    <Svg
      width={16 * size}
      height={16 * size}
      viewBox="0 0 24 24"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      style={style}
    >
      <Path d="M15 3h6v6" />
      <Path d="M10 14 21 3" />
      <Path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </Svg>
  );
}
