import React from 'react';
import { Svg, Path } from 'react-native-svg';

import colors from 'constants/styleGuide/colors';

export default function CheckSvg({
  color = colors.light.ultramarineBlue,
  height = 9,
  width = 12,
  style,
  strokeWidth = 0,
}) {
  return (
    <Svg width={width} height={height} viewBox="0 0 12 9" fill="none" style={style}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.1286 1.17145C11.389 1.43182 11.389 1.85396 11.1286 2.11432L4.60288 8.64003C4.52477 8.71814 4.39814 8.71814 4.32003 8.64003L0.871462 5.19146C0.611094 4.93109 0.611094 4.50895 0.871462 4.24859C1.13183 3.98822 1.55397 3.98822 1.81434 4.24859L4.46146 6.89571L10.1857 1.17145C10.4461 0.911082 10.8682 0.911082 11.1286 1.17145Z"
        fill={color}
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
}
