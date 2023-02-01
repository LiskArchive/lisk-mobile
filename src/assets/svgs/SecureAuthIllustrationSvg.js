/* eslint-disable max-lines */
import React from 'react';
import { Svg, Path, Mask, G } from 'react-native-svg';

import { useTheme } from 'contexts/ThemeContext';
import { themes, colors } from 'constants/styleGuide';

export default function SecureAuthIllustrationSvg({ height = 551, width = 381, style }) {
  const { theme } = useTheme();

  const strokeColor = theme === themes.light ? colors.light.zodiacBlue : colors.dark.platinumGray;

  const fillColor = theme === themes.light ? colors.light.platinumGray : colors.dark.volcanicSand;

  return (
    <Svg width={width} height={height} viewBox="0 0 381 551" fill="none" style={style}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M237.861 124.456L155.362 112.012C153.969 162.428 150.485 210.172 134.529 241.985H273.166C252.479 215.415 239.846 177.46 237.861 124.456"
        fill={fillColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M237.832 117.207C237.215 94.9641 219.003 77.1201 196.612 77.1201C177.238 77.1201 155.362 108.358 155.362 108.358V137.154H159.892C166.728 150.487 180.599 159.618 196.612 159.618C212.625 159.618 226.497 150.487 233.331 137.154H237.861V117.21L237.832 117.207Z"
        fill={fillColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M237.39 135.445C236.677 158.091 217.743 175.871 195.097 175.158C172.452 174.446 154.671 155.511 155.383 132.866C156.095 110.22 175.031 92.4395 197.676 93.1515C220.322 93.8635 238.102 112.799 237.39 135.445"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M222.52 103.62C228.677 110.7 232.414 119.942 232.414 130.061C232.414 152.33 214.361 170.383 192.092 170.383C182.449 170.383 173.6 166.993 166.661 161.346C174.053 169.845 184.939 175.225 197.088 175.225C219.357 175.225 237.41 157.173 237.41 134.904C237.41 122.279 231.604 111.014 222.52 103.62"
        fill={fillColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M329.262 334.376C329.262 334.301 329.265 334.226 329.265 334.15C329.265 260.888 269.874 201.498 196.613 201.498C123.35 201.498 63.9587 260.888 63.9587 334.15C63.9587 334.226 63.9617 334.301 63.9617 334.376C151.28 346.514 239.686 346.812 329.262 334.376"
        fill={colors.light.ultramarineBlue}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M217.11 204.863C217.11 206.722 208.488 208.229 197.85 208.229C187.214 208.229 178.59 206.722 178.59 204.863C178.59 203.004 187.214 201.497 197.85 201.497C208.488 201.497 217.11 203.004 217.11 204.863"
        fill={colors.light.inkBlue}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M237.39 135.445C236.677 158.091 217.743 175.871 195.097 175.158C172.452 174.446 154.671 155.511 155.383 132.866C156.095 110.22 175.031 92.4395 197.676 93.1515C220.322 93.8635 238.102 112.799 237.39 135.445Z"
        stroke={strokeColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M124.918 284.613L115.038 340.067L124.918 340.865V284.613Z"
        fill={colors.light.inkBlue}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M274.917 284.129L284.797 339.583L274.917 340.381V284.129Z"
        fill={colors.light.inkBlue}
      />
      <Path
        d="M3.53119 38.5493H87.5272C92.9832 38.5493 97.4062 42.9723 97.4062 48.4283V160.445C97.4062 165.901 101.829 170.323 107.285 170.323H119.977"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M248.126 363.045V396.152C248.126 403.492 254.075 409.441 261.414 409.441H378.733"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M200.681 91.5256C200.681 92.3516 200.71 92.2316 200.618 93.0326C201.667 93.0566 202.754 93.2066 203.788 93.3016C203.897 92.7026 203.847 92.9486 203.903 92.3326C203.964 91.7026 203.999 91.0656 203.999 90.4196C203.999 89.8046 203.968 89.1976 203.913 88.5976C203.88 88.2056 203.82 87.8226 203.765 87.4376C203.738 87.2556 203.719 87.0716 203.687 86.8916C203.601 86.3876 203.492 85.8926 203.369 85.4016C203.359 85.3606 203.351 85.3186 203.339 85.2776C203.204 84.7436 203.041 84.2206 202.867 83.7036C202.058 81.3166 200.824 79.1316 199.268 77.2146C198.389 77.1586 197.505 77.1196 196.613 77.1196C196.077 77.1196 195.538 77.1526 194.999 77.1996C196.818 79.1436 198.268 81.4306 199.25 83.9536C200.165 86.3026 200.681 88.8516 200.681 91.5256"
        fill={fillColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M188.578 111.493C196.548 109.525 202.825 102.544 204.292 94.3895C203.339 94.1895 202.134 93.9895 201.135 93.9175C200.258 101.479 195.302 108.571 188.578 111.493"
        fill={fillColor}
      />
      <Path
        d="M290.096 28.6851C291.286 29.5501 293.017 30.4151 295.179 30.4151C297.342 30.4151 299.073 29.5501 300.263 28.6851"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M303.831 14.8423V18.3033"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M286.527 14.8423V18.3033"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M295.179 14.8423V21.7633C295.179 22.7183 294.405 23.4943 293.449 23.4943"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M314.213 9.65149V4.46049C314.213 2.54849 312.664 1.00049 310.752 1.00049H305.561"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M284.797 1H279.607C277.694 1 276.146 2.548 276.146 4.46V9.651"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M305.56 39.067H310.751C312.664 39.067 314.212 37.519 314.212 35.607V30.416"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M276.146 30.4155V35.6065C276.146 37.5185 277.695 39.0665 279.607 39.0665H284.797"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M201.219 92.2343C201.219 103.831 191.819 113.232 180.221 113.232C168.624 113.232 159.224 103.831 159.224 92.2343C159.224 80.6373 168.624 71.2363 180.221 71.2363C191.819 71.2363 201.219 80.6373 201.219 92.2343"
        fill={fillColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M164.741 99.0449C163.299 99.0449 161.926 99.3369 160.675 99.8629C163.086 106.037 168.327 110.775 174.81 112.503C175.086 111.563 175.24 110.572 175.24 109.544C175.24 103.746 170.54 99.0449 164.741 99.0449"
        fill={fillColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M173.989 110.527C173.989 116.325 169.288 121.026 163.49 121.026C157.691 121.026 152.991 116.325 152.991 110.527C152.991 104.729 157.691 100.028 163.49 100.028C169.288 100.028 173.989 104.729 173.989 110.527"
        fill={fillColor}
      />
      <Path
        d="M105.929 481.043C112.407 473.671 115.491 463.468 113.401 453.107"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M108.462 470.034C107.046 473.663 104.909 476.976 102.191 479.763"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M109.977 481.822C116.254 473.79 119.117 463.168 116.944 452.393L116.956 452.389C116.559 450.422 114.643 449.149 112.676 449.546C110.708 449.942 109.436 451.858 109.832 453.825L109.858 453.821C110.667 457.836 110.604 461.824 109.797 465.589"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M106.59 456.164C107.723 464.526 104.599 472.602 98.7768 478.05"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M121.278 459.468C121.271 456.899 121.013 454.293 120.486 451.679L120.494 451.676C119.704 447.754 115.883 445.215 111.962 446.006C109.032 446.597 106.874 448.878 106.299 451.63"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M114.316 482.006C117.934 476.719 120.281 470.568 121.024 464.051"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M114.242 442.282C113.263 442.206 112.258 442.262 111.248 442.466C105.371 443.651 101.567 449.375 102.752 455.253L102.772 455.249C104.375 463.199 101.413 471.009 95.6902 475.965"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M118.926 481.483C124.135 472.603 126.224 461.85 124.03 450.965L124.034 450.962C123.381 447.724 121.35 445.115 118.675 443.624"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M98.3672 466.07C97.2382 468.979 95.3692 471.563 92.9452 473.549"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M127.888 467.165C128.787 461.706 128.731 455.995 127.573 450.25L127.575 450.248C125.995 442.416 118.367 437.348 110.534 438.927C102.702 440.506 97.6327 448.135 99.2127 455.968L99.2297 455.964C99.6047 457.824 99.6797 459.676 99.4887 461.467"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M123.766 480.096C125.078 477.405 126.136 474.582 126.916 471.665"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M109.989 548.147V505.178"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M323.363 23.4941H378.733"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M328.699 334.066C328.699 334.066 331.652 343.529 331.801 343.885C334.092 348.342 335.053 354.32 335.003 359.679C334.856 375.38 323.4 388.33 308.444 390.864C306.6 391.176 304.707 391.33 302.773 391.312C281.729 391.115 267.476 376.4 256.024 364.577C249.524 357.866 240.623 348.676 234.968 347.617C217.634 344.371 206.213 327.687 209.459 310.352C212.705 293.018 229.39 281.594 246.723 284.843C272.357 289.643 289.431 307.272 301.898 320.143C304.347 322.671 317.225 333.611 319.483 335.609"
        fill="white"
      />
      <Path
        d="M328.699 334.066C328.699 334.066 331.652 343.529 331.801 343.885C334.092 348.342 335.053 354.32 335.003 359.679C334.856 375.38 323.4 388.33 308.444 390.864C306.6 391.176 304.707 391.33 302.773 391.312C281.729 391.115 267.476 376.4 256.024 364.577C249.524 357.866 240.623 348.676 234.968 347.617C217.634 344.371 206.213 327.687 209.459 310.352C212.705 293.018 229.39 281.594 246.723 284.843C272.357 289.643 289.431 307.272 301.898 320.143C304.347 322.671 317.225 333.611 319.483 335.609"
        stroke={strokeColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M230.825 348.06L183.044 348.785L182.157 290.292L229.938 289.568L230.825 348.06Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M230.825 348.06L183.044 348.785L182.157 290.292L229.938 289.568L230.825 348.06Z"
        stroke={strokeColor}
        strokeLinecap="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M183.302 348.782L178.958 348.848L178.071 290.355L182.414 290.289L183.302 348.782Z"
        fill={strokeColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M183.302 348.782L178.958 348.848L178.071 290.355L182.414 290.289L183.302 348.782Z"
        stroke={strokeColor}
        strokeLinecap="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M114.454 346.896C119.891 346.243 139.175 339.697 147.019 337.686C162.428 333.737 173.103 328.979 177.976 326.195C182.913 316.718 192.768 310.189 204.202 310.037C220.768 309.817 234.376 323.07 234.596 339.637C234.718 348.832 231.3 362.28 214.327 374.122C201.391 383.148 179.712 391.763 156.336 397.168C135.316 402.028 117.656 403.392 103.616 401.257C98.9764 400.551 94.7314 399.463 90.8914 397.993C72.8804 391.096 62.3784 373.699 63.4284 351.672C63.6324 347.384 63.5764 338.843 64.4844 334.459L114.454 346.896Z"
        fill="white"
      />
      <Path
        d="M114.454 346.896C119.891 346.243 139.175 339.697 147.019 337.686C162.428 333.737 173.103 328.979 177.976 326.195C182.913 316.718 192.768 310.189 204.202 310.037C220.768 309.817 234.376 323.07 234.596 339.637C234.718 348.832 231.3 362.28 214.327 374.122C201.391 383.148 179.712 391.763 156.336 397.168C135.316 402.028 117.656 403.392 103.616 401.257C98.9764 400.551 94.7314 399.463 90.8914 397.993C72.8804 391.096 62.3784 373.699 63.4284 351.672C63.6324 347.384 63.5764 338.843 64.4844 334.459"
        stroke={strokeColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M115.038 340.067C115.038 340.067 114.298 346.425 114.422 346.406C120.363 345.484 132.569 341.46 132.569 341.46L115.038 340.067Z"
        fill={fillColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M330.57 341.684L328.225 334.185L319.834 335.276L319.155 335.966L331.356 344.169L330.57 341.684Z"
        fill={fillColor}
      />
      <Mask
        id="mask0_322_2134"
        style="mask-type:luminance"
        maskUnits="userSpaceOnUse"
        x="0"
        y="1"
        width="381"
        height="550"
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 550.294H381V1.29443H0V550.294Z"
          fill="white"
        />
      </Mask>
      <G mask="url(#mask0_322_2134)"></G>
    </Svg>
  );
}
