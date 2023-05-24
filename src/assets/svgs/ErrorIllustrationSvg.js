import React from 'react';
import { Svg, Path, G, Rect, Defs, ClipPath } from 'react-native-svg';

import { useTheme } from 'contexts/ThemeContext';
import { themes, colors } from 'constants/styleGuide';

export default function ErrorIllustrationSvg({ height = 103, width = 199, style }) {
  const { theme } = useTheme();

  const strokeColor = theme === themes.light ? colors.light.zodiacBlue : colors.dark.platinumGray;

  const fillColor = theme === themes.light ? colors.light.platinumGray : colors.dark.volcanicSand;

  const fillColor2 = theme === themes.light ? colors.light.athensWhite : colors.dark.headerBg;

  return (
    <Svg width={width} height={height} viewBox="0 0 199 103" fill="none" style={style}>
      <G clipPath="url(#clip0_2205_49728)">
        <Path
          d="M41.5162 49.8633H36.1721V53.2009H41.5162V49.8633Z"
          fill={fillColor}
          stroke={strokeColor}
          strokeMiterlimit="10"
        />
        <Path
          d="M162.962 49.8633H157.617V53.2009H162.962V49.8633Z"
          fill={fillColor}
          stroke={strokeColor}
          strokeMiterlimit="10"
        />
        <Path
          d="M149.802 59.612H130.095C125.619 59.612 121.945 56.0073 121.945 51.4681C121.945 46.9956 125.553 43.3242 130.095 43.3242H149.802C154.277 43.3242 157.951 46.9289 157.951 51.4681C157.885 56.0073 154.277 59.612 149.802 59.612Z"
          fill={strokeColor}
          stroke={strokeColor}
          strokeMiterlimit="10"
        />
        <Path
          d="M137.711 59.612H118.004C113.528 59.612 109.854 56.0073 109.854 51.4681C109.854 46.9956 113.462 43.3242 118.004 43.3242H137.711C142.186 43.3242 145.86 46.9289 145.86 51.4681C145.794 56.0073 142.186 59.612 137.711 59.612Z"
          fill={fillColor2}
          stroke={strokeColor}
          strokeMiterlimit="10"
        />
        <Path d="M117.403 49.8633H101.37V53.2009H117.403V49.8633Z" fill={strokeColor} />
        <Path d="M136.508 49.8633H120.476V53.2009H136.508V49.8633Z" fill={strokeColor} />
        <Path
          d="M49.5325 59.612H69.239C73.7147 59.612 77.3888 56.0073 77.3888 51.4681C77.3888 46.9956 73.7815 43.3242 69.239 43.3242H49.5325C45.0568 43.3242 41.3827 46.9289 41.3827 51.4681C41.4495 56.0073 45.0568 59.612 49.5325 59.612Z"
          fill={strokeColor}
          stroke={strokeColor}
          strokeMiterlimit="10"
        />
        <Path
          d="M61.6236 59.612H81.33C85.8057 59.612 89.4798 56.0073 89.4798 51.4681C89.4798 46.9956 85.8725 43.3242 81.33 43.3242H61.6236C57.1478 43.3242 53.4738 46.9289 53.4738 51.4681C53.4738 56.0073 57.1478 59.612 61.6236 59.612Z"
          fill={fillColor2}
          stroke={strokeColor}
          strokeMiterlimit="10"
        />
        <Path
          d="M77.3888 53.2048C78.3111 53.2048 79.0588 52.4577 79.0588 51.536C79.0588 50.6143 78.3111 49.8672 77.3888 49.8672C76.4665 49.8672 75.7188 50.6143 75.7188 51.536C75.7188 52.4577 76.4665 53.2048 77.3888 53.2048Z"
          fill={fillColor2}
          stroke={strokeColor}
          strokeMiterlimit="10"
        />
        <Path
          d="M65.5649 53.2048C66.4872 53.2048 67.2349 52.4577 67.2349 51.536C67.2349 50.6143 66.4872 49.8672 65.5649 49.8672C64.6425 49.8672 63.8948 50.6143 63.8948 51.536C63.8948 52.4577 64.6425 53.2048 65.5649 53.2048Z"
          fill={fillColor2}
          stroke={strokeColor}
          strokeMiterlimit="10"
        />
        <Path
          d="M163.028 51.5352H172.447C178.192 51.5352 182.868 56.2079 182.868 61.9486C182.868 67.6894 178.192 72.3621 172.447 72.3621H94.2895C88.5446 72.3621 83.8685 77.0348 83.8685 82.7756V103.002"
          stroke={strokeColor}
          strokeMiterlimit="10"
        />
        <Path
          d="M35.9717 51.5334H26.4859C20.7409 51.5334 16.0648 46.8607 16.0648 41.1199C16.0648 35.3791 20.7409 30.7064 26.4859 30.7064H104.644C110.389 30.7064 115.065 26.0337 115.065 20.2929V0"
          stroke={strokeColor}
          strokeMiterlimit="10"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2205_49728">
          <Rect width="198" height="103" fill="white" transform="translate(0.5)" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
