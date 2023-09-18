import React from 'react';
import { Svg, Path, Mask, G } from 'react-native-svg';

import { useTheme } from 'contexts/ThemeContext';
import { themes, colors } from 'constants/styleGuide';

export default function AddressIllustrationSvg({ height = 338, width = 249, style }) {
  const { theme } = useTheme();

  const strokeColor = theme === themes.light ? colors.light.zodiacBlue : colors.dark.platinumGray;

  const fillColor = theme === themes.light ? colors.light.white : colors.dark.mainBg;

  return (
    <Svg width={width} height={height} viewBox="0 0 249 338" fill="none" style={style}>
      <Path
        d="M1.43555 336.658H247.86"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M113.471 128.001H139.556V117.975H113.471V128.001Z"
        fill={colors.light.platinumGray}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M105.232 307.179C101.406 305.561 97.1989 304.666 92.7831 304.666H69.0621C51.3999 304.666 37.0811 318.985 37.0811 336.648V336.658"
        fill={fillColor}
      />
      <Path
        d="M105.232 307.179C101.406 305.561 97.1989 304.666 92.7831 304.666H69.0621C51.3999 304.666 37.0811 318.985 37.0811 336.648V336.658"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M159.178 42.0869V41.9814H156.487H59.3291V117.976H118.49H159.178H194.484V79.9786C194.484 59.8989 178.905 43.4685 159.178 42.0869Z"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M97.3264 117.976H21.333V79.9786C21.333 58.993 38.3445 41.9814 59.3293 41.9814C80.3149 41.9814 97.3264 58.993 97.3264 79.9786V117.976Z"
        fill={colors.light.ultramarineBlue}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M97.3264 117.976H21.333V79.9786C21.333 58.993 38.3445 41.9814 59.3293 41.9814C80.3149 41.9814 97.3264 58.993 97.3264 79.9786V117.976Z"
        stroke={colors.light.ultramarineBlue}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M97.3264 117.976H21.333V155.973C21.333 176.957 38.3445 193.969 59.3293 193.969C80.3149 193.969 97.3264 176.957 97.3264 155.973V117.976Z"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M160.969 64.0039V3.0498"
        stroke={colors.light.ufoGreen}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Mask
        id="mask0_9_19181"
        style="mask-type:luminance"
        maskUnits="userSpaceOnUse"
        x="1"
        y="0"
        width="248"
        height="338"
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1 337.094H248.296V0.871094H1V337.094Z"
          fill={fillColor}
        />
      </Mask>
      <G mask="url(#mask0_9_19181)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M160.969 13.1555H175.763V0.875977H160.969V13.1555Z"
          fill={colors.light.ufoGreen}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M109.975 336.658H139.556V117.976H109.975V336.658Z"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M104.881 336.658H113.108V117.976H104.881V336.658Z"
          fill={strokeColor}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M104.881 336.658H113.108V117.976H104.881V336.658Z"
          stroke={strokeColor}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M206.31 336.658C206.31 336.658 206.734 318.237 196.514 305.596C186.296 292.956 193.67 322.424 206.31 336.658Z"
          fill={colors.light.ufoGreen}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M199.938 335.9C199.938 335.9 209.288 309.154 224.093 310.323C238.897 311.492 206.95 334.551 199.938 335.9Z"
          fill={colors.light.ufoGreen}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M204.66 335.127C204.66 335.127 201.182 296.723 213.731 296.384C226.279 296.045 209.999 326.095 204.66 335.127Z"
          fill={colors.light.ufoGreen}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M208.264 336.655C208.264 331.812 204.338 327.885 199.493 327.885H192.989C188.145 327.885 184.218 331.811 184.218 336.655V336.658H208.264V336.655Z"
          fill={fillColor}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M208.264 336.655C208.264 331.812 204.338 327.885 199.493 327.885H192.989C188.145 327.885 184.218 331.811 184.218 336.655V336.658H208.264V336.655Z"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M55.7419 107.91H97.3264V102.952H55.7419V107.91Z"
          fill={fillColor}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M55.7419 107.91H97.3264V102.952H55.7419V107.91Z"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M47.6335 112.868H97.3265V107.911H47.6335V112.868Z"
          fill={fillColor}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M47.6335 112.868H97.3265V107.911H47.6335V112.868Z"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M44.1438 117.815H97.3265V112.857H44.1438V117.815Z"
          fill={fillColor}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M44.1438 117.815H97.3265V112.857H44.1438V117.815Z"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}
