import React from 'react';
import { Svg, Path, Mask, G } from 'react-native-svg';

import { useTheme } from 'hooks/useTheme';
import { themes, colors } from 'constants/styleGuide';

export default function ErrorIllustrationSvg({ height = 85, width = 174, style }) {
  const { theme } = useTheme();

  const strokeColor = theme === themes.light ? colors.light.zodiacBlue : colors.dark.platinumGray;

  const fillColor = theme === themes.light ? colors.light.platinumGray : colors.dark.volcanicSand;

  const fillColor2 = theme === themes.light ? colors.light.white : colors.dark.headerBg;

  return (
    <Svg width={width} height={height} viewBox="0 0 174 85" fill="none" style={style}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.9111 36.7941V83.7653H83.1151V63.2828L47.5688 63.1114V36.7941H31.9111Z"
        fill={fillColor2}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.9102 83.7652H83.1142V63.283L47.5678 63.1113V36.7944H31.9102V83.7652Z"
        stroke={strokeColor}
        strokeWidth="0.5"
      />
      <Mask
        id="mask0_3484_3501"
        style="Mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="174"
        height="84"
      >
        <Path fillRule="evenodd" clipRule="evenodd" d="M0 84H174V0H0V84Z" fill={fillColor2} />
      </Mask>
      <G Mask="url(#mask0_3484_3501)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.83203 83.7652H31.9097V36.7944H8.83203V83.7652Z"
          stroke={strokeColor}
          strokeWidth="0.5"
        />
      </G>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.748 29.8927L36.0847 36.7402H18.1688L8.83203 29.8927H26.748Z"
        fill={fillColor2}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.748 29.8927L36.0847 36.7402H18.1688L8.83203 29.8927H26.748Z"
        stroke={strokeColor}
        strokeWidth="0.5"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.5791 27.4634L40.9158 36.7401H22.9998L13.6631 27.4634H31.5791Z"
        fill={fillColor2}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.5791 27.4634L40.9158 36.7401H22.9998L13.6631 27.4634H31.5791Z"
        stroke={strokeColor}
        strokeWidth="0.5"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37.7334 28.7912V70.7385H135.646L115.039 42.0543L135.646 9.64024H58.0468H37.7334V29.2169"
        fill={fillColor2}
      />
      <Path
        d="M37.7334 28.7912V70.7385H135.646L115.039 42.0543L135.646 9.64024H58.0468H37.7334V29.2169"
        stroke={strokeColor}
        strokeWidth="0.5"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M135.493 70.7385L113.924 42.0543L135.493 9.64024L114.887 42.0543"
        fill={fillColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37.7334 70.7383H41.3045V9.64014H37.7334V70.7383Z"
        fill={strokeColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M76.3408 28.1518C76.3408 33.6658 80.8397 38.1358 86.3894 38.1358C91.9395 38.1358 96.4383 33.6658 96.4383 28.1518C96.4383 22.6377 91.9395 18.1674 86.3894 18.1674C80.8397 18.1674 76.3408 22.6377 76.3408 28.1518Z"
        fill={fillColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M55.832 70.748C60.884 49.4144 72.8793 42.2433 86.3895 42.2433C99.9001 42.2433 112.669 48.1595 117.721 70.748H55.832Z"
        fill={fillColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M87.415 18.2189C91.005 19.7422 93.5215 23.2804 93.5215 27.4039C93.5215 32.9179 89.0227 37.3879 83.4726 37.3879C83.1265 37.3879 82.7848 37.3705 82.4473 37.3366C83.658 37.85 84.9901 38.136 86.3893 38.136C91.9394 38.136 96.4383 33.6657 96.4383 28.1517C96.4383 22.9815 92.4832 18.7293 87.415 18.2189Z"
        fill={colors.light.silverGrey}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M91.5082 43.3177C91.5082 43.9111 89.0266 44.3921 85.9655 44.3921C82.9045 44.3921 80.4229 43.9111 80.4229 43.3177C80.4229 42.7243 82.9045 42.243 85.9655 42.243C89.0266 42.243 91.5082 42.7243 91.5082 43.3177Z"
        fill={strokeColor}
      />
      <Path
        d="M37.7334 28.7912V70.7385H135.646L115.039 42.0543L135.646 9.64024H58.0468H37.7334V29.2169"
        stroke={strokeColor}
        strokeWidth="0.5"
      />
      <Mask
        id="mask1_3484_3501"
        style="Mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="174"
        height="84"
      >
        <Path fillRule="evenodd" clipRule="evenodd" d="M0 84H174V0H0V84Z" fill={fillColor2} />
      </Mask>
      <G Mask="url(#mask1_3484_3501)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M137.503 66.0375C127.621 66.0375 119.61 73.997 119.61 83.8159H155.397C155.397 73.997 147.386 66.0375 137.503 66.0375Z"
          fill={fillColor2}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M137.503 66.0375C127.621 66.0375 119.61 73.997 119.61 83.8159H155.397C155.397 73.997 147.386 66.0375 137.503 66.0375Z"
          stroke={strokeColor}
          strokeWidth="0.5"
        />
        <Path
          d="M121.718 75.5447H126.332C128.114 75.5447 129.56 74.1088 129.56 72.3378V67.9284"
          stroke={strokeColor}
          strokeWidth="0.5"
        />
        <Path d="M117.722 45.7875H162.531V83.5822" stroke={strokeColor} strokeWidth="0.5" />
        <Path d="M154.865 48.2761H159.685" stroke={strokeColor} strokeWidth="0.5" />
        <Path d="M154.865 49.6315H159.685" stroke={strokeColor} strokeWidth="0.5" />
        <Path d="M154.865 50.987H159.685" stroke={strokeColor} strokeWidth="0.5" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M113.929 28.7956H136.914V5.95772H113.929V28.7956Z"
          fill="#EC6868"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M131.947 11.9884C132.231 11.7187 132.231 11.2815 131.947 11.0118C131.662 10.7422 131.201 10.7422 130.916 11.0118L125.23 16.4001L120.058 11.4995C119.774 11.2298 119.312 11.2298 119.028 11.4995C118.743 11.7691 118.743 12.2064 119.028 12.476L124.199 17.3767L119.028 22.2773C118.743 22.547 118.743 22.9842 119.028 23.2539C119.312 23.5235 119.774 23.5235 120.058 23.2539L125.23 18.3532L130.916 23.7415C131.201 24.0112 131.662 24.0112 131.947 23.7415C132.231 23.4718 132.231 23.0346 131.947 22.7649L126.26 17.3767L131.947 11.9884Z"
          fill={fillColor2}
        />
        <Path d="M0 83.8073H174" stroke={strokeColor} strokeWidth="0.5" />
      </G>
    </Svg>
  );
}
