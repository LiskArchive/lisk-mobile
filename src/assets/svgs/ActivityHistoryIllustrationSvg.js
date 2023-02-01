import React from 'react';
import { Svg, Path, Mask, G } from 'react-native-svg';

import { useTheme } from 'contexts/ThemeContext';
import { themes, colors } from 'constants/styleGuide';

export default function ActivityHistoryIllustrationSvg({ height = 518, width = 381, style }) {
  const { theme } = useTheme();

  const strokeColor = theme === themes.light ? colors.light.zodiacBlue : colors.dark.platinumGray;

  const fillColor = theme === themes.light ? colors.light.platinumGray : colors.dark.volcanicSand;

  return (
    <Svg width={width} height={height} viewBox="0 0 381 518" fill="none" style={style}>
      <Path
        d="M256.469 488.99V510.045C256.469 513.444 259.224 516.199 262.623 516.199H377.948"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M67.2471 106.133H51.5331C45.8541 106.133 41.2511 101.529 41.2511 95.851V11.281C41.2511 5.603 36.6481 1 30.9701 1H2.88611"
        stroke={fillColor}
      />
      <Path
        d="M309.493 146.022H378.009"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Mask
        id="mask0_322_2080"
        style="mask-type:luminance"
        maskUnits="userSpaceOnUse"
        x="0"
        y="1"
        width="381"
        height="517"
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 517.417H381V1.41699H0V517.417Z"
          fill="white"
        />
      </Mask>
      <G mask="url(#mask0_322_2080)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M82.427 475.316H285.752V89.8359H82.427V475.316Z"
          stroke={strokeColor}
          strokeLinecap="round"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M97.9 186.717H271.534V107.9H97.9V186.717Z"
          fill={colors.light.ultramarineBlue}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M285.751 475.316H298.573V89.8359H285.751V475.316Z"
          fill={fillColor}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M285.751 475.316H298.573V89.8359H285.751V475.316Z"
          stroke={strokeColor}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M201.167 447.413C201.167 455.825 194.348 462.644 185.936 462.644C177.524 462.644 170.705 455.825 170.705 447.413C170.705 439.001 177.524 432.182 185.936 432.182C194.348 432.182 201.167 439.001 201.167 447.413"
          fill="white"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M172.637 448.898C172.637 440.486 179.456 433.667 187.868 433.667C190.91 433.667 193.737 434.569 196.115 436.105C193.416 433.674 189.855 432.181 185.936 432.181C177.524 432.181 170.705 439 170.705 447.412C170.705 452.782 173.491 457.493 177.689 460.205C174.594 457.417 172.637 453.391 172.637 448.898"
          fill={fillColor}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M158.208 186.717C158.208 201.761 170.404 213.957 185.449 213.957C200.493 213.957 212.689 201.761 212.689 186.717C212.689 171.673 200.493 159.476 185.449 159.476C170.404 159.476 158.208 171.673 158.208 186.717"
          fill="white"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M158.208 186.717C158.208 201.761 170.404 213.957 185.449 213.957C200.493 213.957 212.689 201.761 212.689 186.717C212.689 171.673 200.493 159.476 185.449 159.476C170.404 159.476 158.208 171.673 158.208 186.717Z"
          stroke={strokeColor}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M185.449 213.957C177.695 213.957 170.704 210.712 165.743 205.513C169.021 197.874 176.609 192.521 185.449 192.521C194.289 192.521 201.877 197.874 205.155 205.513C200.194 210.712 193.202 213.957 185.449 213.957"
          fill={colors.light.ultramarineBlue}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M185.449 213.957C177.695 213.957 170.704 210.712 165.743 205.513C169.021 197.874 176.609 192.521 185.449 192.521C194.289 192.521 201.877 197.874 205.155 205.513C200.194 210.712 193.202 213.957 185.449 213.957Z"
          stroke={strokeColor}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M178.874 183.242C178.874 186.873 181.817 189.817 185.449 189.817C189.08 189.817 192.023 186.873 192.023 183.242C192.023 179.611 189.08 176.667 185.449 176.667C181.817 176.667 178.874 179.611 178.874 183.242"
          fill="white"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M178.874 183.242C178.874 186.873 181.817 189.817 185.449 189.817C189.08 189.817 192.023 186.873 192.023 183.242C192.023 179.611 189.08 176.667 185.449 176.667C181.817 176.667 178.874 179.611 178.874 183.242Z"
          stroke={strokeColor}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M201.167 447.413C201.167 455.825 194.348 462.644 185.936 462.644C177.524 462.644 170.705 455.825 170.705 447.413C170.705 439.001 177.524 432.182 185.936 432.182C194.348 432.182 201.167 439.001 201.167 447.413Z"
          stroke={strokeColor}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M141.427 250.654C141.427 258.189 135.318 264.298 127.782 264.298C120.247 264.298 114.138 258.189 114.138 250.654C114.138 243.118 120.247 237.009 127.782 237.009C135.318 237.009 141.427 243.118 141.427 250.654"
          fill={colors.light.ufoGreen}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M141.427 328.172C141.427 335.708 135.318 341.816 127.782 341.816C120.247 341.816 114.138 335.708 114.138 328.172C114.138 320.636 120.247 314.527 127.782 314.527C135.318 314.527 141.427 320.636 141.427 328.172"
          fill={colors.light.ufoGreen}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M162.539 253.284H215.335V244.629H162.539V253.284Z"
          fill="white"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M162.539 253.284H215.335V244.629H162.539V253.284Z"
          stroke={strokeColor}
        />
        <Path d="M215.335 264.298H162.539" stroke={strokeColor} />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M162.539 328.172H215.335V319.517H162.539V328.172Z"
          fill="white"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M162.539 328.172H215.335V319.517H162.539V328.172Z"
          stroke={strokeColor}
        />
        <Path d="M215.335 339.187H162.539" stroke={strokeColor} />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M243.908 253.691H257.733V244.222H243.908V253.691Z"
          fill="white"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M243.908 253.691H257.733V244.222H243.908V253.691Z"
          stroke={strokeColor}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M243.908 327.741H257.733V318.273H243.908V327.741Z"
          fill="white"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M243.908 327.741H257.733V318.273H243.908V327.741Z"
          stroke={strokeColor}
        />
        <Path d="M114.138 286.664H257.733" stroke={fillColor} />
        <Path d="M114.138 362.301H257.733" stroke={fillColor} />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M97.9 418.999H271.534V107.899H97.9V418.999Z"
          stroke={strokeColor}
        />
      </G>
    </Svg>
  );
}
