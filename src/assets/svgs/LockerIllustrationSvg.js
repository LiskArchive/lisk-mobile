/* eslint-disable max-lines */
import React from 'react';
import { Svg, Path, Mask, G } from 'react-native-svg';

import { useTheme } from 'contexts/ThemeContext';
import { themes, colors } from 'constants/styleGuide';

export default function LockerIllustrationSvg({ height = 308, width = 284, style }) {
  const { theme } = useTheme();

  const strokeColor = theme === themes.light ? colors.light.zodiacBlue : colors.dark.platinumGray;

  const fillColor = theme === themes.light ? colors.light.platinumGray : colors.dark.volcanicSand;

  return (
    <Svg width={width} height={height} viewBox="0 0 284 308" fill="none" style={style}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M39.9458 76.8906V307.044H60.0178V292.472H99.0788V307.044H119.15V76.8906H39.9458Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M39.9458 76.8906V307.044H60.0168V292.473H99.0788V307.044H119.15V76.8906H39.9458Z"
        stroke={strokeColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37.811 76.7933H122.057V60.8193H37.811V76.7933Z"
        fill={strokeColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.3838 57.7714H103.849V44.7764H19.3838V57.7714Z"
        fill={fillColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M103.849 57.7714H170.011V44.7764H103.849V57.7714Z"
        fill={fillColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M102.541 60.8195H170.011V57.7725H102.541V60.8195Z"
        fill={colors.light.ufoGreen}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M117.026 76.8906V307.044H153.835V292.472H225.471V307.044H262.28V76.8906H117.026Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M117.026 76.8906V307.044H153.836V292.473H225.47V307.044H262.28V76.8906H117.026Z"
        stroke={strokeColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M137.608 278.266H251.186V93.4365H137.608V278.266Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M137.608 278.266H251.186V93.4365H137.608V278.266Z"
        stroke={strokeColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M134.004 278.266H137.608V93.4365H134.004V278.266Z"
        fill={strokeColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M134.004 278.266H137.608V93.4365H134.004V278.266Z"
        stroke={strokeColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M130.395 139.158H141.212V115.174H130.395V139.158Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M130.395 139.158H141.212V115.174H130.395V139.158Z"
        stroke={strokeColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M130.395 254.395H141.212V230.412H130.395V254.395Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M130.395 254.395H141.212V230.412H130.395V254.395Z"
        stroke={strokeColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M214.426 184.138C214.426 191.645 208.341 197.731 200.833 197.731C193.326 197.731 187.24 191.645 187.24 184.138C187.24 176.631 193.326 170.545 200.833 170.545C208.341 170.545 214.426 176.631 214.426 184.138Z"
        fill={strokeColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M214.426 184.138C214.426 191.645 208.341 197.731 200.833 197.731C193.326 197.731 187.24 191.645 187.24 184.138C187.24 176.631 193.326 170.545 200.833 170.545C208.341 170.545 214.426 176.631 214.426 184.138Z"
        stroke={strokeColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M216.191 184.137C216.191 190.961 210.66 196.492 203.836 196.492C197.012 196.492 191.481 190.961 191.481 184.137C191.481 177.313 197.012 171.782 203.836 171.782C210.66 171.782 216.191 177.313 216.191 184.137Z"
        fill={fillColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M206.837 184.138C206.837 185.796 205.493 187.14 203.835 187.14C202.178 187.14 200.833 185.796 200.833 184.138C200.833 182.48 202.178 181.136 203.835 181.136C205.493 181.136 206.837 182.48 206.837 184.138Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M206.837 184.138C206.837 185.796 205.493 187.14 203.835 187.14C202.178 187.14 200.833 185.796 200.833 184.138C200.833 182.48 202.178 181.136 203.835 181.136C205.493 181.136 206.837 182.48 206.837 184.138Z"
        stroke={strokeColor}
      />
      <Path d="M203.835 191.395V196.494" stroke={strokeColor} />
      <Path d="M203.835 171.782V176.881" stroke={strokeColor} />
      <Path d="M196.578 184.138H191.48" stroke={strokeColor} />
      <Path d="M216.191 184.138H211.092" stroke={strokeColor} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M198.705 179.006L195.1 175.401L198.705 179.006Z"
        fill="white"
      />
      <Path d="M198.705 179.006L195.1 175.401" stroke={strokeColor} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M212.573 192.874L208.968 189.269L212.573 192.874Z"
        fill="white"
      />
      <Path d="M212.573 192.874L208.968 189.269" stroke={strokeColor} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M198.705 189.269L195.1 192.874L198.705 189.269Z"
        fill="white"
      />
      <Path d="M198.705 189.269L195.1 192.874" stroke={strokeColor} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M212.573 175.401L208.968 179.006L212.573 175.401Z"
        fill="white"
      />
      <Path d="M212.573 175.401L208.968 179.006" stroke={strokeColor} />
      <Path d="M203.835 191.395V196.494" stroke={strokeColor} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M82.2142 76.3193H17.3892L38.5262 120.705H87.1662L82.2142 76.3193Z"
        fill={strokeColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M100.073 145.095H15.7969L19.3849 57.7715H103.849L100.073 145.095Z"
        fill={colors.light.ufoGreen}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M95.5482 143.065L17.3892 142.004L21.4782 60.374L103.849 60.819L95.5482 143.065Z"
        fill={strokeColor}
      />
      <Path d="M19.7495 49.3145H170.012" stroke={strokeColor} />
      <Path d="M19.7495 54.0186H170.012" stroke={strokeColor} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M222.505 42.8525L236.683 44.8255L233.32 68.9945C232.938 71.7425 230.4 73.6605 227.651 73.2785L223.426 72.6905C220.678 72.3085 218.76 69.7695 219.142 67.0215L222.505 42.8525Z"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M226.325 15.3955L240.503 17.3685L236.682 44.8255L222.505 42.8525L226.325 15.3955Z"
        fill={colors.light.ultramarineBlue}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M226.325 15.3955L240.503 17.3685L236.682 44.8255L222.505 42.8525L226.325 15.3955Z"
        fill={colors.light.ultramarineBlue}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M235.25 3.18555L240.503 17.3675L226.325 15.3945L235.25 3.18555Z"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M236.832 7.45555L235.25 3.18555L232.562 6.86155L236.832 7.45555Z"
        fill={strokeColor}
      />
      <Path
        d="M205.61 5.10724L205.418 3.33724C205.265 1.93124 206.281 0.667244 207.688 0.515244C209.094 0.362244 210.358 1.37824 210.511 2.78524L210.703 4.55424"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M216.759 65.2524L220.495 56.0254L207.093 57.4804L212.723 65.6904L216.759 65.2524Z"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M203.633 25.3899L201.234 25.6499L199.87 13.0949C199.763 12.1069 200.477 11.2199 201.464 11.1129L202.075 11.0459L203.633 25.3899Z"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M208.539 8.35156L213.465 53.7136"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M202.037 9.05753C202.031 10.1755 202.082 11.3315 202.211 12.5195L207.094 57.4805L220.496 56.0255L215.614 11.0645C215.485 9.87753 215.292 8.73453 215.047 7.64453L202.037 9.05753Z"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M215.143 7.63456L201.934 9.06956L201.836 8.17256C201.679 6.72356 202.727 5.42056 204.176 5.26356L212.137 4.39956C213.586 4.24156 214.888 5.28856 215.046 6.73856L215.143 7.63456Z"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M220.496 56.0253L207.094 57.4803L206.786 54.6513L220.189 53.1953L220.496 56.0253Z"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M216.183 65.3975L216.361 67.0395C216.447 67.8305 215.875 68.5415 215.083 68.6275C214.292 68.7135 213.581 68.1415 213.495 67.3505L213.308 65.6265"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Mask
        id="mask0_9_19256"
        style="mask-type:luminance"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="284"
        height="308"
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 307.944H283.878V0H0V307.944Z"
          fill="white"
        />
      </Mask>
      <G mask="url(#mask0_9_19256)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M200.109 77.0224H242.564V34.5674H200.109V77.0224Z"
          fill="white"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M200.109 77.0224H242.564V34.5674H200.109V77.0224Z"
          stroke={strokeColor}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M115.559 76.7933H210.82V60.8193H115.559V76.7933Z"
          fill={colors.light.ultramarineBlue}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M93.8746 141.107H9.59863L19.6266 59.8789H103.903L93.8746 141.107Z"
          fill={fillColor}
        />
        <Path d="M27.0874 86.0479H87.9184" stroke={strokeColor} />
        <Path d="M25.1851 99.6562H86.0161" stroke={strokeColor} />
        <Path d="M22.4673 113.266H83.2983" stroke={strokeColor} />
        <Path
          d="M30.231 63.1583C24.327 63.1583 19.541 58.3723 19.541 52.4683C19.541 46.5643 24.327 41.7783 30.231 41.7783C32.951 41.7783 35.433 42.7933 37.32 44.4663"
          stroke={strokeColor}
        />
        <Path
          d="M55.7124 63.1583C49.8094 63.1583 45.0234 58.3723 45.0234 52.4683C45.0234 46.5643 49.8094 41.7783 55.7124 41.7783C58.5964 41.7783 61.2134 42.9203 63.1364 44.7763"
          stroke={strokeColor}
        />
        <Path
          d="M87.9937 63.1583C82.0897 63.1583 77.3037 58.3723 77.3037 52.4683C77.3037 46.5643 82.0897 41.7783 87.9937 41.7783C90.8777 41.7783 93.4957 42.9203 95.4187 44.7773"
          stroke={strokeColor}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M202.035 307.044H225.47V292.472H202.035V307.044Z"
          fill="white"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M202.035 307.044H225.47V292.472H202.035V307.044Z"
          stroke={strokeColor}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M202.036 307.045V292.473H225.471L202.036 307.045Z"
          fill={strokeColor}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M202.036 307.045V292.473H225.471L202.036 307.045Z"
          stroke={strokeColor}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M60.0171 307.044H77.3031V292.472H60.0171V307.044Z"
          fill="white"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M60.0171 307.044H77.3031V292.472H60.0171V307.044Z"
          stroke={strokeColor}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M60.0171 307.044H77.3031V292.472H60.0171V307.044Z"
          fill={strokeColor}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M60.0171 307.044H77.3031V292.472H60.0171V307.044Z"
          stroke={strokeColor}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M200.109 40.695H242.564V38.333H200.109V40.695Z"
          fill={fillColor}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M198.029 38.3335H244.413V33.9385H198.029V38.3335Z"
          fill="white"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M198.029 38.3335H244.413V33.9385H198.029V38.3335Z"
          stroke={strokeColor}
        />
        <Path
          d="M0.499512 307.044H283.379"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}
