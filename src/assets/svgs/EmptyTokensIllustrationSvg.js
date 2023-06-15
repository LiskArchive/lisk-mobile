import React from 'react';
import { Svg, Path } from 'react-native-svg';

import { useTheme } from 'contexts/ThemeContext';
import { themes, colors } from 'constants/styleGuide';

export default function EmptyTokensIllustrationSvg({ height = 62, width = 90, style }) {
  const { theme } = useTheme();

  const fillColorLevel0 = theme === themes.light ? colors.light.white : colors.dark.white;
  const fillColorLevel1 =
    theme === themes.light ? colors.light.athensWhite : colors.dark.athensWhite;
  const fillColorLevel2 =
    theme === themes.light ? colors.light.platinumGray : colors.dark.platinumGray;
  const fillColorLevel3 = theme === themes.light ? colors.light.silverGrey : colors.dark.silverGrey;
  const fillColorLevel4 =
    theme === themes.light ? colors.light.zodiacBlue : colors.dark.ultramarineBlue;

  return (
    <Svg width={width} height={height} viewBox="0 0 90 62" fill="none" style={style}>
      <Path d="M65.2898 55.1602H27.9805V61.2713H65.2898V55.1602Z" fill={fillColorLevel3} />
      <Path d="M38.7975 55.1602H27.9805V61.2713H38.7975V55.1602Z" fill={fillColorLevel1} />
      <Path d="M54.3524 55.1602H38.7969V61.2713H54.3524V55.1602Z" fill={fillColorLevel2} />
      <Path
        d="M65.2898 55.1602H27.9805V61.2713H65.2898V55.1602Z"
        stroke={fillColorLevel4}
        strokeMiterlimit="10"
      />
      <Path d="M63.7859 49.0469H26.4766V55.158H63.7859V49.0469Z" fill={fillColorLevel3} />
      <Path d="M37.2936 49.0469H26.4766V55.158H37.2936V49.0469Z" fill={fillColorLevel1} />
      <Path d="M52.8485 49.0469H37.293V55.158H52.8485V49.0469Z" fill={fillColorLevel2} />
      <Path
        d="M63.7859 49.0469H26.4766V55.158H63.7859V49.0469Z"
        stroke={fillColorLevel4}
        strokeMiterlimit="10"
      />
      <Path d="M62.5769 42.9375H25.2676V49.0486H62.5769V42.9375Z" fill={fillColorLevel3} />
      <Path d="M36.0846 42.9375H25.2676V49.0486H36.0846V42.9375Z" fill={fillColorLevel1} />
      <Path d="M51.6395 42.9375H36.084V49.0486H51.6395V42.9375Z" fill={fillColorLevel2} />
      <Path
        d="M62.5769 42.9375H25.2676V49.0486H62.5769V42.9375Z"
        stroke={fillColorLevel4}
        strokeMiterlimit="10"
      />
      <Path
        d="M27.9805 58.2212V55.1602H51.1831L27.9805 58.2212Z"
        fill={fillColorLevel4}
        stroke={fillColorLevel4}
        strokeMiterlimit="10"
      />
      <Path
        d="M26.4766 50.7789V49.0469H49.6792L26.4766 50.7789Z"
        fill={fillColorLevel4}
        stroke={fillColorLevel4}
        strokeMiterlimit="10"
      />
      <Path d="M63.9402 36.8281H26.6309V42.9392H63.9402V36.8281Z" fill={fillColorLevel3} />
      <Path d="M37.4479 36.8281H26.6309V42.9392H37.4479V36.8281Z" fill={fillColorLevel1} />
      <Path d="M53.0028 36.8281H37.4473V42.9392H53.0028V36.8281Z" fill={fillColorLevel2} />
      <Path
        d="M63.9402 36.8281H26.6309V42.9392H63.9402V36.8281Z"
        stroke={fillColorLevel4}
        strokeMiterlimit="10"
      />
      <Path d="M62.4363 30.7266H25.127V36.8377H62.4363V30.7266Z" fill={fillColorLevel3} />
      <Path d="M35.9439 30.7266H25.127V36.8377H35.9439V30.7266Z" fill={fillColorLevel1} />
      <Path d="M51.4989 30.7266H35.9434V36.8377H51.4989V30.7266Z" fill={fillColorLevel2} />
      <Path
        d="M62.4363 30.7266H25.127V36.8377H62.4363V30.7266Z"
        stroke={fillColorLevel4}
        strokeMiterlimit="10"
      />
      <Path
        d="M26.6309 39.8891V36.8281H49.8226L26.6309 39.8891Z"
        fill={fillColorLevel4}
        stroke={fillColorLevel4}
        strokeMiterlimit="10"
      />
      <Path
        d="M43.8953 0.530422C35.5619 0.552208 28.819 7.3387 28.8517 15.672C28.8735 24.0054 35.66 30.7483 43.9933 30.7156L46.2482 30.7047L46.1502 0.519531L43.8953 0.530422Z"
        fill={fillColorLevel3}
        stroke={fillColorLevel4}
        strokeWidth="0.7646"
        strokeMiterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M46.2055 30.7156C54.5439 30.7156 61.3035 23.956 61.3035 15.6176C61.3035 7.27915 54.5439 0.519531 46.2055 0.519531C37.867 0.519531 31.1074 7.27915 31.1074 15.6176C31.1074 23.956 37.867 30.7156 46.2055 30.7156Z"
        fill={fillColorLevel0}
        stroke={fillColorLevel4}
        strokeWidth="0.7646"
        strokeMiterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M46.2053 27.395C52.7088 27.395 57.9809 22.1228 57.9809 15.6193C57.9809 9.11586 52.7088 3.84375 46.2053 3.84375C39.7018 3.84375 34.4297 9.11586 34.4297 15.6193C34.4297 22.1228 39.7018 27.395 46.2053 27.395Z"
        fill={fillColorLevel2}
      />
      <Path
        d="M46.16 3.85163C45.953 3.85163 45.746 3.86252 45.5391 3.87342C51.7482 4.17843 56.7046 9.29826 56.7264 15.5946C56.7482 21.8908 51.8245 27.0434 45.6153 27.381C45.8223 27.3919 46.0293 27.3919 46.2362 27.3919C52.7395 27.3702 57.99 22.0869 57.9683 15.5837C57.9574 9.08039 52.6632 3.82984 46.16 3.85163Z"
        fill={fillColorLevel3}
      />
      <Path
        d="M48.3498 17.7615L48.3359 13.4805L44.0549 13.4943L44.0688 17.7754L48.3498 17.7615Z"
        stroke={fillColorLevel4}
        strokeWidth="0.7646"
        strokeMiterlimit="10"
      />
      <Path d="M85.3123 0.792969H69.6914V16.4139H85.3123V0.792969Z" fill="#8A8CA2" />
      <Path
        d="M72.873 3.97266L82.1432 13.2428"
        stroke={fillColorLevel0}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <Path
        d="M82.1432 3.97266L72.873 13.2428"
        stroke={fillColorLevel0}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <Path
        d="M62.5766 29.7227L59.2324 42.9362H63.9274V36.8251H62.4241L62.5766 29.7227Z"
        fill={fillColorLevel4}
      />
      <Path
        d="M79.9033 56.389L65.748 25.8359L60.7465 28.1532L74.9018 58.7063L79.9033 56.389Z"
        fill={fillColorLevel3}
      />
      <Path
        d="M69.8552 34.6886L65.752 25.832L60.7504 28.1493L64.8536 37.0058L69.8552 34.6886Z"
        fill={fillColorLevel1}
      />
      <Path
        d="M75.7624 47.4326L69.8594 34.6914L64.8578 37.0086L70.7608 49.7498L75.7624 47.4326Z"
        fill={fillColorLevel2}
      />
      <Path
        d="M79.9033 56.389L65.748 25.8359L60.7465 28.1532L74.9018 58.7063L79.9033 56.389Z"
        stroke={fillColorLevel4}
        strokeWidth="0.9025"
        strokeMiterlimit="10"
      />
      <Path d="M84.8546 55.7578H51.1836V61.2698H84.8546V55.7578Z" fill={fillColorLevel3} />
      <Path d="M60.9439 55.7578H51.1836V61.2698H60.9439V55.7578Z" fill={fillColorLevel1} />
      <Path d="M74.9848 55.7578H60.9434V61.2698H74.9848V55.7578Z" fill={fillColorLevel2} />
      <Path
        d="M84.8546 55.7578H51.1836V61.2698H84.8546V55.7578Z"
        stroke={fillColorLevel4}
        strokeWidth="0.9025"
        strokeMiterlimit="10"
      />
      <Path d="M89.0479 61.2695H0.943359" stroke={fillColorLevel4} strokeMiterlimit="10" />
      <Path d="M41.3891 55.5078H6.21484V61.2703H41.3891V55.5078Z" fill={fillColorLevel3} />
      <Path d="M16.4109 55.5078H6.21484V61.2703H16.4109V55.5078Z" fill={fillColorLevel1} />
      <Path d="M31.0725 55.5078H16.4102V61.2703H31.0725V55.5078Z" fill={fillColorLevel2} />
      <Path
        d="M41.3891 55.5078H6.21484V61.2703H41.3891V55.5078Z"
        stroke={fillColorLevel4}
        strokeMiterlimit="10"
      />
      <Path d="M40.8344 49.7578H5.66016V55.5203H40.8344V49.7578Z" fill={fillColorLevel3} />
      <Path d="M15.8562 49.7578H5.66016V55.5203H15.8562V49.7578Z" fill={fillColorLevel1} />
      <Path d="M30.5178 49.7578H15.8555V55.5203H30.5178V49.7578Z" fill={fillColorLevel2} />
      <Path
        d="M40.8344 49.7578H5.66016V55.5203H40.8344V49.7578Z"
        stroke={fillColorLevel4}
        strokeMiterlimit="10"
      />
      <Path
        d="M6.21484 56.9566V55.5078H28.0776L6.21484 56.9566Z"
        fill={fillColorLevel4}
        stroke={fillColorLevel4}
        strokeMiterlimit="10"
      />
    </Svg>
  );
}
