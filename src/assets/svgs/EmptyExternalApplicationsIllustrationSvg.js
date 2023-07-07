import React from 'react';
import { Svg, Path } from 'react-native-svg';

import { useTheme } from 'contexts/ThemeContext';
import { themes, colors } from 'constants/styleGuide';

export default function EmptyExternalApplicationsIllustrationSvg({
  height = 63,
  width = 67,
  style,
}) {
  const { theme } = useTheme();

  const fillColorLevel1 = theme === themes.light ? colors.light.white : colors.dark.white;
  const fillColorLevel2 =
    theme === themes.light ? colors.light.platinumGray : colors.dark.platinumGray;
  const fillColorLevel3 = theme === themes.light ? colors.light.smoothGray : colors.dark.smoothGray;
  const fillColorLevel4 =
    theme === themes.light ? colors.light.ultramarineBlue : colors.dark.ultramarineBlue;
  const fillColorLevel5 = theme === themes.light ? colors.light.zodiacBlue : colors.dark.zodiacBlue;

  return (
    <Svg width={width} height={height} viewBox="0 0 67 63" fill="none" style={style}>
      <Path d="M48.8054 21.3438V38.7326H12.1758V30.9919L48.8054 21.3438Z" fill={fillColorLevel5} />
      <Path
        d="M48.8052 21.3438H46.657L9.81445 31.0938H12.2774L48.8052 21.3438Z"
        fill={fillColorLevel4}
      />
      <Path
        d="M30.8791 37.7308C38.294 37.7308 44.305 31.7198 44.305 24.3048C44.305 16.8899 38.294 10.8789 30.8791 10.8789C23.4641 10.8789 17.4531 16.8899 17.4531 24.3048C17.4531 31.7198 23.4641 37.7308 30.8791 37.7308Z"
        fill={fillColorLevel5}
        stroke="black"
        strokeWidth="0.5"
        strokeMiterlimit="10"
      />
      <Path
        d="M32.9162 37.7308C40.3311 37.7308 46.3421 31.7198 46.3421 24.3048C46.3421 16.8899 40.3311 10.8789 32.9162 10.8789C25.5012 10.8789 19.4902 16.8899 19.4902 24.3048C19.4902 31.7198 25.5012 37.7308 32.9162 37.7308Z"
        fill={fillColorLevel1}
        stroke="black"
        strokeWidth="0.5"
        strokeMiterlimit="10"
      />
      <Path
        d="M32.9175 34.5615C38.5835 34.5615 43.1767 29.9683 43.1767 24.3022C43.1767 18.6362 38.5835 14.043 32.9175 14.043C27.2514 14.043 22.6582 18.6362 22.6582 24.3022C22.6582 29.9683 27.2514 34.5615 32.9175 34.5615Z"
        fill={fillColorLevel2}
      />
      <Path
        d="M32.3147 14.0352C26.8333 14.2574 22.4629 18.7666 22.4629 24.2944C22.4629 29.8222 26.8425 34.3407 32.3147 34.5629C37.7962 34.3407 42.1666 29.8315 42.1666 24.3037C42.1666 18.7759 37.7962 14.2574 32.3147 14.0352Z"
        fill={fillColorLevel2}
      />
      <Path
        d="M35.1113 26.74L35.6328 22.1211L31.0139 21.5996L30.4924 26.2184L35.1113 26.74Z"
        stroke={fillColorLevel5}
        strokeMiterlimit="10"
      />
      <Path d="M58.407 31.0938H9.81445V62.4363H58.407V31.0938Z" fill={fillColorLevel5} />
      <Path d="M58.4065 31.0938H14.2676V62.4363H58.4065V31.0938Z" fill={fillColorLevel4} />
      <Path
        d="M51.2963 49.3074C52.7026 49.3074 53.8426 48.1674 53.8426 46.7611C53.8426 45.3549 52.7026 44.2148 51.2963 44.2148C49.89 44.2148 48.75 45.3549 48.75 46.7611C48.75 48.1674 49.89 49.3074 51.2963 49.3074Z"
        fill={fillColorLevel5}
      />
      <Path d="M66.5645 62.4336H0.0644531" stroke="black" strokeMiterlimit="10" />
      <Path d="M55.1949 0.0742188H38.9727V16.2964H55.1949V0.0742188Z" fill={fillColorLevel3} />
      <Path
        d="M42.2695 3.37109L51.8992 13.0007"
        stroke={fillColorLevel1}
        strokeWidth="2.4421"
        strokeMiterlimit="10"
      />
      <Path
        d="M51.8992 3.37109L42.2695 13.0007"
        stroke={fillColorLevel1}
        strokeWidth="2.4421"
        strokeMiterlimit="10"
      />
    </Svg>
  );
}
