import React from 'react';
import { Svg, Path } from 'react-native-svg';
import colors from 'constants/styleGuide/colors';

export default function LiskMobileLogoSvg({
  color = colors.light.ultramarineBlue,
  height = 56,
  width = 206,
  style,
}) {
  return (
    <Svg width={width} height={height} viewBox="0 0 206 56" fill="none" style={style}>
      <Path
        d="M19.22 55.4632L26.41 47.3232C26.4644 47.2623 26.4787 47.1754 26.4465 47.1004C26.4144 47.0253 26.3416 46.9757 26.26 46.9732H18.35C18.2916 46.9756 18.2356 46.9495 18.2 46.9032L11.48 39.3032C11.423 39.2333 11.423 39.1331 11.48 39.0632L22.67 19.6532C22.7097 19.5888 22.7097 19.5075 22.67 19.4432L18 11.3532C17.9647 11.2895 17.8977 11.25 17.825 11.25C17.7522 11.25 17.6852 11.2895 17.65 11.3532L0.999961 40.1232C0.946628 40.1943 0.946628 40.2921 0.999961 40.3632L14.34 55.4632C14.3826 55.5058 14.4397 55.5308 14.5 55.5332H19.01C19.0872 55.5454 19.1655 55.5193 19.22 55.4632Z"
        fill={color}
      />
      <Path
        d="M24.14 0.101833L19.47 8.19183C19.4303 8.2562 19.4303 8.33746 19.47 8.40183L24.32 16.8018L37.18 39.0618C37.2333 39.1329 37.2333 39.2307 37.18 39.3018L30.38 47.0018L23.13 55.2218C23.0726 55.2803 23.0566 55.3678 23.0897 55.4427C23.1227 55.5176 23.1981 55.5648 23.28 55.5618H34.09C34.1502 55.5594 34.2073 55.5344 34.25 55.4918L47.59 40.3918C47.6433 40.3207 47.6433 40.2229 47.59 40.1518L24.5 0.101833C24.462 0.0386498 24.3937 0 24.32 0C24.2463 0 24.1779 0.0386498 24.14 0.101833Z"
        fill={color}
      />
      <Path
        d="M95 52.7231H87.25V32.7931L78.46 47.3431H77.58L68.79 32.7931V52.7231H61V18.4531H68.77L78 33.6731L87.23 18.4531H95V52.7231Z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M111.77 27.6719C104.67 27.6499 98.8931 33.3819 98.86 40.4819C98.8197 43.9129 100.161 47.2161 102.581 49.648C105.002 52.0799 108.299 53.4363 111.73 53.4119C118.83 53.4118 124.589 47.6619 124.6 40.5618C124.611 33.4617 118.87 27.694 111.77 27.6719ZM114.588 35.4443C116.352 36.496 117.397 38.4302 117.31 40.4819C117.397 42.5336 116.352 44.4677 114.588 45.5194C112.824 46.5712 110.626 46.5712 108.862 45.5194C107.098 44.4677 106.053 42.5336 106.14 40.4819C106.053 38.4302 107.098 36.496 108.862 35.4443C110.626 34.3926 112.824 34.3926 114.588 35.4443Z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M142.72 53.4131C149.08 53.4131 154.32 47.7831 154.32 40.4831C154.32 33.1831 149.08 27.5531 142.72 27.5431C139.977 27.398 137.316 28.5007 135.48 30.5431V18.4531H128.19V52.7131H135.48V50.4131C137.316 52.4555 139.977 53.5582 142.72 53.4131ZM141.26 34.4831C144.61 34.4831 147.04 36.8131 147.04 40.4831H147C147 44.1531 144.61 46.4831 141.26 46.4831C137.91 46.4831 135.48 44.1831 135.48 40.4831C135.48 36.7831 137.91 34.4831 141.26 34.4831Z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M161.58 17.3438C159.17 17.3328 157.206 19.2742 157.19 21.6838C157.211 24.0932 159.151 26.0459 161.56 26.0838C163.97 26.0837 165.924 24.1332 165.93 21.7237C165.935 19.3141 163.989 17.3548 161.58 17.3438ZM165.2 52.7238V28.2438H157.92V52.7238H165.2Z"
        fill={color}
      />
      <Path d="M170.01 24.0212V52.7212H177.3V15.7812L170.01 24.0212Z" fill={color} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M198.14 45.0031C196.903 46.2327 195.213 46.8983 193.47 46.8431C190.8 46.8431 188.57 46.0031 187.65 43.3731H204.93C205.125 42.4053 205.223 41.4203 205.22 40.4331C205.22 33.0431 199.97 27.5031 192.88 27.5031C189.417 27.3875 186.062 28.713 183.613 31.1636C181.165 33.6143 179.842 36.9707 179.96 40.4331C179.96 47.7331 185.11 53.3631 193.42 53.3631C198 53.3631 201.62 51.6931 204 48.3631L198.14 45.0031ZM192.72 34.0741C195.119 34.0741 197.237 35.6397 197.94 37.9331H187.5C188.203 35.6397 190.321 34.0741 192.72 34.0741Z"
        fill={color}
      />
    </Svg>
  );
}
