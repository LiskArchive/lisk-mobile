import React from 'react';
import { Svg, Path, Mask, G } from 'react-native-svg';

import { useTheme } from 'contexts/ThemeContext';
import { themes, colors } from 'constants/styleGuide';

export default function AvatarIllustrationSvg({ height = 376, width = 272, style }) {
  const { theme } = useTheme();

  const strokeColor = theme === themes.light ? colors.light.zodiacBlue : colors.dark.platinumGray;

  return (
    <Svg width={width} height={height} viewBox="0 0 272 376" fill="none" style={style}>
      <Mask
        id="mask0_9_19226"
        style="mask-type:luminance"
        maskUnits="userSpaceOnUse"
        x="1"
        y="35"
        width="271"
        height="271"
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.45996 35.1875H271.46V305.188H1.45996V35.1875Z"
          fill="white"
        />
      </Mask>
      <G mask="url(#mask0_9_19226)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M118.599 294.187C53.9047 294.187 1.45996 241.743 1.45996 177.048C1.45996 112.354 53.9047 59.9092 118.599 59.9092C183.294 59.9092 235.738 112.354 235.738 177.048C235.738 241.743 183.294 294.187 118.599 294.187Z"
          fill="white"
          stroke={strokeColor}
        />
      </G>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.4212 308.499L72.4353 330.366L50.5665 374.38L6.5542 352.512L28.4212 308.499Z"
        fill={colors.light.ultramarineBlue}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.4212 308.499L72.4353 330.366L50.5665 374.38L6.5542 352.512L28.4212 308.499Z"
        fill={colors.light.ultramarineBlue}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M232.722 203.57L150.717 226.653C145.627 228.085 141.731 232.196 140.572 237.356L127.896 293.82C179.302 289.783 221.381 252.565 232.722 203.57Z"
        fill={colors.light.inkBlue}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M161.021 0.921875H204.35V44.2523L161.021 0.921875Z"
        fill={colors.light.ufoGreen}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M113.632 60.0215C51.2433 62.6253 1.46045 114.019 1.46045 177.049C1.46045 213.565 18.1714 246.175 44.3606 267.658L175.8 200.577L113.632 60.0215Z"
        fill={colors.light.ultramarineBlue}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M113.632 60.0215C51.2433 62.6253 1.46045 114.019 1.46045 177.049C1.46045 213.565 18.1714 246.175 44.3606 267.658L175.8 200.577L113.632 60.0215Z"
        fill={colors.light.ultramarineBlue}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36.283 73.9484C33.9952 64.8351 24.9013 59.0719 15.6175 61.0022C6.33368 62.9334 0.2913 71.844 1.82631 81.113L36.283 73.9484Z"
        fill={colors.light.yellowCopacabana}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36.283 73.9484C33.9952 64.8351 24.9013 59.0719 15.6175 61.0022C6.33368 62.9334 0.2913 71.844 1.82631 81.113L36.283 73.9484Z"
        stroke={colors.light.yellowCopacabana}
      />
    </Svg>
  );
}
