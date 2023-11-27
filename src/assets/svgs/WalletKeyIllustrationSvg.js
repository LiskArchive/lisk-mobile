import React from 'react';
import { Svg, Path } from 'react-native-svg';

import { useTheme } from 'contexts/ThemeContext';
import { themes, colors } from 'constants/styleGuide';

export default function WalletKeyIllustrationSvg({ height = 211, width = 288, style }) {
  const { theme } = useTheme();

  const strokeColor = theme === themes.light ? colors.light.zodiacBlue : colors.dark.platinumGray;
  const fillColor = colors.light.athensWhite;

  return (
    <Svg width={width} height={height} viewBox="0 0 288 211" fill="none" style={style}>
      <Path
        d="M252.241 0.672852H95.0972V86.3965H252.241V0.672852Z"
        stroke={colors.light.ultramarineBlue}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M95.0972 0.672852V80.5868"
        stroke={colors.light.ultramarineBlue}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M109.369 0.672852V86.3965"
        stroke={colors.light.ultramarineBlue}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M123.671 0.672852V86.3965"
        stroke={colors.light.ultramarineBlue}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M137.943 0.672852V86.3965"
        stroke={colors.light.ultramarineBlue}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M152.214 0.672852V86.3965"
        stroke={colors.light.ultramarineBlue}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M252.21 0.672852H95.0972"
        stroke={colors.light.ultramarineBlue}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M252.21 14.9443H95.0972"
        stroke={colors.light.ultramarineBlue}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M252.21 29.248H95.0972"
        stroke={colors.light.ultramarineBlue}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M252.21 43.5195H95.0972"
        stroke={colors.light.ultramarineBlue}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M252.21 57.8223H95.0972"
        stroke={colors.light.ultramarineBlue}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M252.21 72.0938H95.0972"
        stroke={colors.light.ultramarineBlue}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M252.21 86.3965H95.0972"
        stroke={colors.light.ultramarineBlue}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M166.518 0.672852V86.3965"
        stroke={colors.light.ultramarineBlue}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M180.789 0.672852V86.3965"
        stroke={colors.light.ultramarineBlue}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M195.092 0.672852V86.3965"
        stroke={colors.light.ultramarineBlue}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M209.363 0.672852V86.3965"
        stroke={colors.light.ultramarineBlue}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M223.667 0.672852V86.3965"
        stroke={colors.light.ultramarineBlue}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M237.938 0.672852V86.3965"
        stroke={colors.light.ultramarineBlue}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M226.066 72.915H0.785156V210.168H226.066V72.915Z"
        fill={colors.light.silverGrey}
        stroke={strokeColor}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M226.066 72.915H0.785156V83.2713H226.066V72.915Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.55264 80.1766C9.70351 80.1766 10.6365 79.2436 10.6365 78.0927C10.6365 76.9418 9.70351 76.0088 8.55264 76.0088C7.40176 76.0088 6.46875 76.9418 6.46875 78.0927C6.46875 79.2436 7.40176 80.1766 8.55264 80.1766Z"
        fill={colors.light.furyRed}
      />
      <Path
        d="M15.5937 80.1766C16.7445 80.1766 17.6775 79.2436 17.6775 78.0927C17.6775 76.9418 16.7445 76.0088 15.5937 76.0088C14.4428 76.0088 13.5098 76.9418 13.5098 78.0927C13.5098 79.2436 14.4428 80.1766 15.5937 80.1766Z"
        fill={colors.light.yellowCopacabana}
      />
      <Path
        d="M22.6029 80.1766C23.7538 80.1766 24.6868 79.2436 24.6868 78.0927C24.6868 76.9418 23.7538 76.0088 22.6029 76.0088C21.4521 76.0088 20.519 76.9418 20.519 78.0927C20.519 79.2436 21.4521 80.1766 22.6029 80.1766Z"
        fill={colors.light.ufoGreen}
      />
      <Path
        d="M176.021 104.646H47.6094V191.633H176.021V104.646Z"
        fill={colors.light.platinumGray}
      />
      <Path d="M54.3978 104.646H47.6094V191.633H54.3978V104.646Z" fill="#C5CDE0" />
      <Path d="M175.99 138.463H140.848V160.375H175.99V138.463Z" fill="#C5CDE0" />
      <Path
        d="M176.021 104.646H47.6094V191.633H176.021V104.646Z"
        stroke={strokeColor}
        strokeMiterlimit="10"
      />
      <Path
        d="M143.468 138.463H174.632C179.968 138.463 184.325 142.789 184.325 148.156C184.325 153.492 179.999 157.849 174.632 157.849H143.468V138.463Z"
        fill={colors.light.ultramarineBlue}
      />
      <Path
        d="M150.162 143.482H147.826V152.797H150.162V143.482Z"
        fill={colors.light.platinumGray}
      />
      <Path
        d="M280.499 53.3065C272.606 59.9686 261.366 74.5242 261.366 74.5242H255.43C255.43 74.5242 247.852 66.8202 244.063 62.9681C241.663 65.3678 238.411 74.6505 238.411 74.6505H232.475C232.475 74.6505 224.771 66.9149 220.635 62.7471C218.93 64.6415 217.414 66.3465 215.836 67.9884C213.657 70.1986 211.731 73.135 209.079 74.2716C206.49 75.3767 203.08 74.5874 200.049 74.5874C193.765 74.5874 187.482 74.619 181.167 74.5558C179.841 74.5558 179.147 74.9347 178.452 76.0714C169.611 90.7217 152.814 98.2679 136.269 95.079C119.503 91.8268 106.653 78.5026 103.906 61.5157C99.9273 36.8248 120.008 14.123 145.047 15.1018C159.665 15.7017 170.78 22.427 178.515 34.7725C179.241 35.9407 180.031 36.2249 181.294 36.2249C207.216 36.1933 233.107 36.2249 259.029 36.1617C260.545 36.1617 261.681 36.5406 262.818 37.5826C268.091 42.445 273.458 47.2127 278.794 51.9804C279.205 52.454 279.805 52.8013 280.499 53.3065ZM130.396 43.8974C124.05 43.8658 118.872 48.9492 118.809 55.2956C118.777 61.642 123.829 66.8202 130.207 66.8833C136.648 66.9465 141.889 61.7999 141.889 55.3903C141.889 49.044 136.774 43.929 130.396 43.8974Z"
        fill={colors.light.platinumGray}
        stroke="black"
        strokeMiterlimit="10"
      />
      <Path
        d="M286.467 53.3065C277.879 60.5685 269.701 67.5148 261.397 74.5242C257.608 70.6722 253.819 66.8202 250.03 62.9681C245.957 67.0728 242.231 70.8301 238.443 74.6505C234.496 70.6722 230.738 66.9149 226.602 62.7471C224.897 64.6415 223.382 66.3465 221.803 67.9884C219.625 70.1986 217.699 73.135 215.046 74.2716C212.457 75.3767 209.047 74.5874 206.016 74.5874C199.733 74.5874 193.449 74.619 187.135 74.5558C185.809 74.5558 185.114 74.9347 184.419 76.0714C175.579 90.7217 158.781 98.2679 142.237 95.079C125.471 91.8268 112.62 78.5026 109.873 61.5157C105.895 36.8248 125.976 14.123 151.014 15.1018C165.633 15.7017 176.747 22.427 184.483 34.7725C185.209 35.9407 185.998 36.2249 187.261 36.2249C213.183 36.1933 239.074 36.2249 264.997 36.1617C266.512 36.1617 267.649 36.5406 268.786 37.5826C274.058 42.445 279.426 47.2127 284.762 51.9804C285.172 52.454 285.74 52.8013 286.467 53.3065ZM136.364 43.8974C130.017 43.8658 124.839 48.9492 124.776 55.2956C124.744 61.642 129.796 66.8202 136.174 66.8833C142.616 66.9465 147.857 61.7999 147.857 55.3903C147.857 49.044 142.71 43.929 136.364 43.8974Z"
        fill={fillColor}
        stroke="black"
        strokeMiterlimit="10"
      />
    </Svg>
  );
}
