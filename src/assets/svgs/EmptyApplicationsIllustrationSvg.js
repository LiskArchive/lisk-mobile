import React from 'react';
import { Svg, Path } from 'react-native-svg';

import { useTheme } from 'contexts/ThemeContext';
import { themes, colors } from 'constants/styleGuide';

export default function EmptyApplicationsIllustrationSvg({ height = 69, width = 76, style }) {
  const { theme } = useTheme();

  const fillColorLevel1 = theme === themes.light ? colors.light.white : colors.dark.white;
  const fillColorLevel2 =
    theme === themes.light ? colors.light.platinumGray : colors.dark.platinumGray;
  const fillColorLevel3 = theme === themes.light ? colors.light.smoothGray : colors.dark.smoothGray;
  const fillColorLevel4 =
    theme === themes.light ? colors.light.zodiacBlue : colors.dark.ultramarineBlue;

  return (
    <Svg width={width} height={height} viewBox="0 0 76 69" fill="none" style={style}>
      <Path
        d="M62.3148 11.293H40.3786C39.2139 11.293 38.2637 12.2432 38.2637 13.4079V35.3441C38.2637 36.5088 39.2139 37.459 40.3786 37.459H62.3148C63.4795 37.459 64.4297 36.5088 64.4297 35.3441V13.4079C64.4297 12.2432 63.4795 11.293 62.3148 11.293Z"
        fill={fillColorLevel4}
        stroke={fillColorLevel4}
        strokeMiterlimit="10"
      />
      <Path
        d="M27.4317 37.5839H3.41123C2.58364 37.5839 1.84801 37.1548 1.43933 36.4396C1.03064 35.7244 1.03064 34.8764 1.43933 34.1612L13.4444 13.3592C13.8531 12.644 14.599 12.2148 15.4163 12.2148H18.9719L27.4317 37.5839Z"
        fill={fillColorLevel4}
      />
      <Path
        d="M17.0105 13.4114C17.4192 12.6962 18.1549 12.2773 18.9824 12.2773C19.7998 12.2773 20.5354 12.7065 20.9543 13.4114L32.9084 34.1215C33.3171 34.8367 33.3171 35.6848 32.9084 36.3897C32.4997 37.1049 31.764 37.5238 30.9365 37.5238H7.02842C6.21105 37.5238 5.47541 37.0947 5.05651 36.3897C4.64783 35.6745 4.64783 34.8265 5.05651 34.1215L17.0105 13.4114Z"
        fill={fillColorLevel2}
        stroke={fillColorLevel4}
        strokeMiterlimit="10"
      />
      <Path
        d="M65.7159 37.523H43.7798C42.5844 37.523 41.6035 36.5524 41.6035 35.3468V13.4106C41.6035 12.2152 42.5741 11.2344 43.7798 11.2344H65.7159C66.9113 11.2344 67.8921 12.205 67.8921 13.4106V35.3468C67.8921 36.5422 66.9113 37.523 65.7159 37.523Z"
        fill={fillColorLevel2}
        stroke={fillColorLevel4}
        strokeMiterlimit="10"
      />
      <Path
        d="M51.7193 68.1714C44.4753 68.1714 38.5801 62.2762 38.5801 55.0322C38.5801 47.7883 44.4651 41.8828 51.7193 41.8828H54.4268V68.1714H51.7193Z"
        fill={fillColorLevel4}
        stroke={fillColorLevel4}
        strokeMiterlimit="10"
      />
      <Path
        d="M54.7427 68.1729C47.4988 68.1729 41.6035 62.2777 41.6035 55.0337C41.6035 47.7898 47.4988 41.8945 54.7427 41.8945C61.9867 41.8945 67.8819 47.7898 67.8819 55.0337C67.8819 62.2777 61.9867 68.1729 54.7427 68.1729Z"
        fill={fillColorLevel2}
        stroke={fillColorLevel4}
        strokeMiterlimit="10"
      />
      <Path
        d="M22.3037 41.9453H9.6345C8.87843 41.9453 8.18367 42.3438 7.80564 42.9977L1.47102 53.9709C1.09299 54.6248 1.09299 55.4319 1.47102 56.0858L7.80564 67.059C8.18367 67.7129 8.87843 68.1113 9.6345 68.1113H22.3037C23.0598 68.1113 23.7545 67.7129 24.1326 67.059L30.4672 56.0858C30.8452 55.4319 30.8452 54.6248 30.4672 53.9709L24.1326 42.9977C23.7545 42.354 23.0598 41.9453 22.3037 41.9453Z"
        fill={fillColorLevel4}
        stroke={fillColorLevel4}
        strokeMiterlimit="10"
      />
      <Path
        d="M22.3039 68.1714H9.63465C8.85815 68.1714 8.14296 67.7525 7.75471 67.0884L1.42009 56.1153C1.03184 55.4409 1.03184 54.6133 1.42009 53.939L7.75471 42.9658C8.14296 42.2915 8.85815 41.8828 9.63465 41.8828H22.3039C23.0804 41.8828 23.7956 42.3017 24.1838 42.9658L30.5184 53.939C30.9067 54.6133 30.9067 55.4409 30.5184 56.1153L24.1838 67.0884C23.7956 67.7525 23.0804 68.1714 22.3039 68.1714ZM9.63465 42.0054C8.90924 42.0054 8.22469 42.3937 7.85688 43.0271L1.52227 54.0003C1.15445 54.6338 1.15445 55.4205 1.52227 56.054L7.85688 67.0271C8.22469 67.6606 8.89902 68.0488 9.63465 68.0488H22.3039C23.0293 68.0488 23.7138 67.6606 24.0817 67.0271L30.4163 56.054C30.7841 55.4205 30.7841 54.6338 30.4163 54.0003L24.0817 43.0271C23.7138 42.3937 23.0395 42.0054 22.3039 42.0054H9.63465Z"
        fill={fillColorLevel4}
        stroke={fillColorLevel4}
        strokeMiterlimit="10"
      />
      <Path
        d="M25.9211 68.1714H13.2518C12.4753 68.1714 11.7601 67.7525 11.3719 67.0884L5.03728 56.1152C4.64903 55.4409 4.64903 54.6133 5.03728 53.939L11.3719 42.9658C11.7601 42.2915 12.4753 41.8828 13.2518 41.8828H25.9211C26.6976 41.8828 27.4128 42.3017 27.801 42.9658L34.1356 53.939C34.5239 54.6133 34.5239 55.4409 34.1356 56.1152L27.801 67.0884C27.4128 67.7525 26.6976 68.1714 25.9211 68.1714Z"
        fill={fillColorLevel2}
        stroke={fillColorLevel4}
        strokeMiterlimit="10"
      />
      <Path d="M75.3602 0.167969H57.9707V17.5575H75.3602V0.167969Z" fill={fillColorLevel3} />
      <Path
        d="M61.5059 3.70312L71.8354 14.0326"
        stroke={fillColorLevel1}
        strokeWidth="2.3734"
        strokeMiterlimit="10"
      />
      <Path
        d="M71.8354 3.70312L61.5059 14.0326"
        stroke={fillColorLevel1}
        strokeWidth="2.3734"
        strokeMiterlimit="10"
      />
    </Svg>
  );
}
