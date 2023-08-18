import React from 'react';
import { Svg, Path, ClipPath, G, Defs, Rect } from 'react-native-svg';

import { useTheme } from 'contexts/ThemeContext';
import { themes, colors } from 'constants/styleGuide';

export default function ScanDeviceSvg({ height = 20, width = 20, style }) {
  const { theme } = useTheme();

  const strokeColor = theme === themes.light ? colors.light.blueGray : colors.dark.slateGray;

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...style}
    >
      <G clip-path="url(#clip0_4130_6576)">
        <Path
          d="M16.6868 9H1.3125"
          stroke={strokeColor}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M12.347 15.6893H14.9893C15.1759 15.6893 15.3548 15.6152 15.4867 15.4833C15.6187 15.3514 15.6928 15.1724 15.6928 14.9858V12.3443M12.347 2.30859H14.9893C15.1759 2.30859 15.3548 2.38271 15.4867 2.51464C15.6187 2.64658 15.6928 2.82551 15.6928 3.01209V5.65434M5.65555 2.30859H3.01405C2.82747 2.30859 2.64853 2.38271 2.5166 2.51464C2.38467 2.64658 2.31055 2.82551 2.31055 3.01209V5.65434M5.65555 15.6908H3.01405C2.82747 15.6908 2.64853 15.6167 2.5166 15.4848C2.38467 15.3529 2.31055 15.1739 2.31055 14.9873V12.3451"
          stroke="#8A8CA2"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4130_6576">
          <Rect width="18" height="18" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
