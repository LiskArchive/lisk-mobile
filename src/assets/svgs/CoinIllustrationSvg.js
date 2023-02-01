import React from 'react';
import { Svg, Path, Mask, G } from 'react-native-svg';

import { useTheme } from 'contexts/ThemeContext';
import { themes, colors } from 'constants/styleGuide';

export default function CoinIllustrationSvg({ height = 519, width = 381, style }) {
  const { theme } = useTheme();

  const strokeColor = theme === themes.light ? colors.light.zodiacBlue : colors.dark.platinumGray;

  const fillColor = theme === themes.light ? colors.light.platinumGray : colors.dark.volcanicSand;

  return (
    <Svg width={width} height={height} viewBox="0 0 381 519" fill="none" style={style}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M200.533 287.052C150.268 287.052 109.52 246.301 109.52 196.032C109.52 145.764 150.268 105.013 200.533 105.013C201.619 105.013 202.7 105.039 203.777 105.077V105.013C203.777 105.013 88.8915 96.0597 90.3835 196.032C91.8755 296.005 203.777 287.052 203.777 287.052V286.988C202.7 287.026 201.619 287.052 200.533 287.052"
        fill={fillColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M200.533 287.052C150.268 287.052 109.52 246.301 109.52 196.032C109.52 145.764 150.268 105.013 200.533 105.013C201.619 105.013 202.7 105.039 203.777 105.077V105.013C203.777 105.013 88.8915 96.0597 90.3835 196.032C91.8755 296.005 203.777 287.052 203.777 287.052V286.988C202.7 287.026 201.619 287.052 200.533 287.052Z"
        stroke={strokeColor}
      />
      <Path
        d="M0.658997 448.782H117.377C122.208 448.782 126.123 444.866 126.123 440.036V369.715C126.123 364.885 130.039 360.969 134.869 360.969H175.85C179.014 360.969 181.579 358.404 181.579 355.24V307.72"
        stroke={fillColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M291.545 196.032C291.545 246.301 250.797 287.052 200.532 287.052C150.267 287.052 109.519 246.301 109.519 196.032C109.519 145.763 150.267 105.012 200.532 105.012C250.797 105.012 291.545 145.763 291.545 196.032Z"
        stroke={strokeColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M200.532 117.285C199.43 117.285 198.336 117.314 197.245 117.358C239.208 119.082 272.701 153.643 272.701 196.033C272.701 238.422 239.208 272.983 197.245 274.707C198.336 274.751 199.43 274.78 200.532 274.78C244.02 274.78 279.274 239.524 279.274 196.033C279.274 152.541 244.02 117.285 200.532 117.285"
        fill={fillColor}
      />
      <Path d="M95.6946 228.675H115.549" stroke={strokeColor} strokeLinecap="round" />
      <Path d="M99.6043 155.069H119.434" stroke={strokeColor} strokeLinecap="round" />
      <Path d="M132.367 256.72H149.569" stroke={strokeColor} strokeLinecap="round" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M279.274 196.032C279.274 239.523 244.02 274.78 200.532 274.78C157.044 274.78 121.79 239.523 121.79 196.032C121.79 152.541 157.044 117.284 200.532 117.284C244.02 117.284 279.274 152.541 279.274 196.032Z"
        stroke={strokeColor}
        strokeLinecap="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M291.545 196.032C291.545 246.301 250.797 287.052 200.532 287.052C150.267 287.052 109.519 246.301 109.519 196.032C109.519 145.763 150.267 105.012 200.532 105.012C250.797 105.012 291.545 145.763 291.545 196.032Z"
        stroke={strokeColor}
        strokeLinecap="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M181.503 193.114L198.414 210.025L215.324 193.114L198.414 176.203L181.503 193.114Z"
        fill={colors.light.ultramarineBlue}
      />
      <Mask
        id="mask0_322_2113"
        style="mask-type:luminance"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="381"
        height="519"
      >
        <Path fillRule="evenodd" clipRule="evenodd" d="M0 519H381V0H0V519Z" fill="white" />
      </Mask>
      <G mask="url(#mask0_322_2113)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M310.015 412.851H335.811V396.928H310.015V412.851Z"
          stroke={fillColor}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M322.913 404.889L310.015 396.927H335.811L322.913 404.889Z"
          stroke={fillColor}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M232.816 85.5569V15.5849C232.816 10.9849 236.545 7.25488 241.147 7.25488H377.141"
          stroke={fillColor}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M78.435 84.7782H105.669V69.4082H78.435V84.7782Z"
          stroke={fillColor}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M97.3924 77.0934C97.3924 80.0424 95.0014 82.4334 92.0524 82.4334C89.1024 82.4334 86.7114 80.0424 86.7114 77.0934C86.7114 74.1444 89.1024 71.7534 92.0524 71.7534C95.0014 71.7534 97.3924 74.1444 97.3924 77.0934Z"
          stroke={fillColor}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M86.904 69.4082H97.2V67.0132H86.904V69.4082Z"
          stroke={fillColor}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M297.058 404.889H252.682C247.719 404.889 243.696 408.912 243.696 413.875V515.15"
          stroke={fillColor}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M1.533 78.8101H63.179"
          stroke={fillColor}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}
