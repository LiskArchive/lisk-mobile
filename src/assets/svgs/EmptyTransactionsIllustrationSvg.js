import React from 'react';
import { Svg, Path } from 'react-native-svg';

import { useTheme } from 'contexts/ThemeContext';
import { themes, colors } from 'constants/styleGuide';

export default function EmptyTransactionsIllustrationSvg({ height = 62, width = 92, style }) {
  const { theme } = useTheme();

  const fillColorLevel0 = theme === themes.light ? colors.light.white : colors.dark.white;
  const fillColorLevel1 =
    theme === themes.light ? colors.light.athensWhite : colors.dark.athensWhite;
  const fillColorLevel2 =
    theme === themes.light ? colors.light.platinumGray : colors.dark.platinumGray;
  const fillColorLevel3 = theme === themes.light ? colors.light.silverGrey : colors.dark.silverGrey;
  const fillColorLevel4 = theme === themes.light ? colors.light.smoothGray : colors.dark.smoothGray;
  const fillColorLevel5 =
    theme === themes.light ? colors.light.zodiacBlue : colors.dark.ultramarineBlue;

  return (
    <Svg width={width} height={height} viewBox="0 0 92 62" fill="none" style={style}>
      <Path
        d="M31.2563 33.3906C23.6537 33.3906 17.4883 39.5561 17.4883 47.1586C17.4883 54.7612 23.6537 60.9267 31.2563 60.9267H33.3144V33.3906H31.2563Z"
        fill={fillColorLevel5}
        stroke={fillColorLevel5}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M33.3149 60.9267C40.9188 60.9267 47.0829 54.7625 47.0829 47.1586C47.0829 39.5548 40.9188 33.3906 33.3149 33.3906C25.711 33.3906 19.5469 39.5548 19.5469 47.1586C19.5469 54.7625 25.711 60.9267 33.3149 60.9267Z"
        fill={fillColorLevel0}
        stroke={fillColorLevel5}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M33.3152 57.9C39.2484 57.9 44.0582 53.0902 44.0582 47.157C44.0582 41.2239 39.2484 36.4141 33.3152 36.4141C27.3821 36.4141 22.5723 41.2239 22.5723 47.157C22.5723 53.0902 27.3821 57.9 33.3152 57.9Z"
        fill={fillColorLevel2}
      />
      <Path
        d="M33.3138 36.4141C33.1276 36.4141 32.9324 36.4229 32.7461 36.4318C38.4148 36.7246 42.9213 41.4174 42.9213 47.157C42.9213 52.8967 38.4236 57.5895 32.755 57.8822C32.9413 57.8911 33.1276 57.9 33.3227 57.9C39.2575 57.9 44.0657 53.0918 44.0657 47.157C44.0657 41.2222 39.2486 36.4141 33.3138 36.4141Z"
        fill={fillColorLevel3}
      />
      <Path
        d="M35.8594 48.2227L34.3828 44.6094L30.7695 46.086L32.2461 49.6993L35.8594 48.2227Z"
        stroke={fillColorLevel5}
        strokeMiterlimit="10"
      />
      <Path
        d="M16.1489 39.9023H1.21875"
        stroke={fillColorLevel5}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.1479 39.9023H13.5664"
        stroke={fillColorLevel5}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.7997 43.957H3.42773"
        stroke={fillColorLevel5}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.3917 49.1094H2.14062"
        stroke={fillColorLevel5}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.1492 53.5352H8.67969"
        stroke={fillColorLevel5}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M56.0961 1.13672C48.4936 1.13672 42.3281 7.30217 42.3281 14.9047C42.3281 22.5073 48.4936 28.6728 56.0961 28.6728H58.1542V1.13672H56.0961Z"
        fill={fillColorLevel5}
        stroke={fillColorLevel5}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M58.1547 28.6728C65.7586 28.6728 71.9228 22.5086 71.9228 14.9047C71.9228 7.30087 65.7586 1.13672 58.1547 1.13672C50.5509 1.13672 44.3867 7.30087 44.3867 14.9047C44.3867 22.5086 50.5509 28.6728 58.1547 28.6728Z"
        fill={fillColorLevel0}
        stroke={fillColorLevel5}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M58.1551 25.6461C64.0882 25.6461 68.898 20.8363 68.898 14.9031C68.898 8.96994 64.0882 4.16016 58.1551 4.16016C52.2219 4.16016 47.4121 8.96994 47.4121 14.9031C47.4121 20.8363 52.2219 25.6461 58.1551 25.6461Z"
        fil={fillColorLevel1}
        stroke={fillColorLevel1}
        strokeMiterlimit="10"
      />
      <Path
        d="M58.1537 4.17188C57.9674 4.17188 57.7722 4.18075 57.5859 4.18962C63.2546 4.48237 67.7611 9.1752 67.7611 14.9148C67.7611 20.6545 63.2546 25.3473 57.5859 25.64C57.7722 25.6489 57.9585 25.6578 58.1537 25.6578C64.0885 25.6578 68.8966 20.8496 68.8966 14.9148C68.8966 8.98004 64.0885 4.17188 58.1537 4.17188Z"
        fill={fillColorLevel3}
      />
      <Path
        d="M60.1817 13.9507L56.6387 12.3125L55.0005 15.8555L58.5435 17.4937L60.1817 13.9507Z"
        stroke={fillColorLevel5}
        strokeMiterlimit="10"
      />
      <Path d="M74.0859 6.76172H81.2272" stroke={fillColorLevel5} strokeMiterlimit="10" />
      <Path d="M75.2852 11.2578H85.6378" stroke={fillColorLevel5} strokeMiterlimit="10" />
      <Path d="M91.7056 15.7812H75.2852" stroke={fillColorLevel5} strokeMiterlimit="10" />
      <Path d="M74.0859 20.8945H82.895" stroke={fillColorLevel5} strokeMiterlimit="10" />
      <Path d="M55.147 30.4297H42.4258V43.1509H55.147V30.4297Z" fill={fillColorLevel4} />
      <Path
        d="M45.0156 33.0195L52.565 40.5689"
        stroke={fillColorLevel0}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <Path
        d="M52.565 33.0195L45.0156 40.5689"
        stroke={fillColorLevel0}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </Svg>
  );
}
