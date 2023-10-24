import React from 'react';
import { Svg, Path } from 'react-native-svg';

export default function HomeSvg({
  color = '#000000',
  height = 20,
  width = 20,
  style,
  variant = 'fill',
}) {
  let children = null;

  switch (variant) {
    case 'fill':
      children = (
        <Path
          d="M2.97744 9.479L2.17035 10.2858C1.9085 10.5476 1.48614 10.5542 1.21626 10.3007C0.933429 10.0351 0.927176 9.5879 1.20247 9.31448L9.28123 1.29049C9.67069 0.903667 10.2992 0.903098 10.6893 1.28922L18.7976 9.31337C19.0737 9.58661 19.0679 10.0344 18.7848 10.3004C18.5153 10.5536 18.0936 10.5475 17.8316 10.2866L17.0571 9.51545V17.5993C17.0571 18.3725 16.4303 18.9993 15.6571 18.9993H11.3509V14.5204H8.6258V18.9993H4.37744C3.60424 18.9993 2.97744 18.3725 2.97744 17.5993V9.479Z"
          fillRule="evenodd"
          clipRule="evenodd"
          fill={color}
        />
      );
      break;

    case 'outline':
      children = (
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.002 1.00076C9.81816 0.992152 9.63138 1.05709 9.48955 1.19609L1.20585 9.31487C0.93566 9.57968 0.930826 10.0132 1.19504 10.284C1.46007 10.5556 1.89526 10.5604 2.16628 10.2948L3.02235 9.45578V17.6426C3.02235 18.3834 3.61669 18.9854 4.35452 18.9977C4.36772 18.9984 4.38102 18.9988 4.39441 18.9988H7.32559C7.33783 18.9988 7.34999 18.9985 7.36208 18.9979H8.65584V14.4842H11.3956V18.9979L15.6479 18.9979C15.6557 18.9979 15.6634 18.9977 15.6711 18.9975C16.4196 18.9975 17.0263 18.3911 17.0263 17.6426V9.49956L17.8377 10.2948C18.1087 10.5604 18.5439 10.5556 18.809 10.284C19.0732 10.0132 19.0683 9.57968 18.7981 9.31487L10.5144 1.19609C10.3726 1.05708 10.1858 0.992149 10.002 1.00076ZM10.002 2.6151L4.37758 8.12754V17.6102L4.39441 17.61H7.30062V14.0953C7.30062 13.7124 7.51577 13.3798 7.83175 13.2118C7.94194 13.1383 8.07435 13.0954 8.21677 13.0954H8.28731L8.30062 13.0953H11.7508L11.7642 13.0954H11.7779C11.8227 13.0954 11.8666 13.0996 11.909 13.1077C12.3861 13.1835 12.7508 13.5968 12.7508 14.0953V17.609H15.6479C15.6557 17.609 15.6634 17.6092 15.6711 17.6094V8.17132L10.002 2.6151Z"
          fill={color}
        />
      );
      break;

    default:
      break;
  }

  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" style={style}>
      {children}
    </Svg>
  );
}