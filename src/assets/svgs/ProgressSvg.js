import React from 'react';
import { Svg, Path, Rect } from 'react-native-svg';

export default ({ color, size = 1 }) => (
  <Svg
    width={16 * size}
    height={16 * size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Rect opacity="0.05" x="1" y="1" width="14" height="14" fill="white" fillOpacity="0.05" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.5625 8C14.5625 11.6243 11.6251 14.5625 8 14.5625C4.37487 14.5625 1.4375 11.6243 1.4375 8C1.4375 4.37575 4.37487 1.4375 8 1.4375C11.6251 1.4375 14.5625 4.37575 14.5625 8Z"
      stroke={color || '#E1E3EB'}
    />
    <Path
      d="M8 1.4375C11.6251 1.4375 14.5625 4.37575 14.5625 8C14.5625 11.6243 11.6251 14.5625 8 14.5625C4.37487 14.5625 1.4375 11.6243 1.4375 8"
      stroke={color || '#254898'}
    />
  </Svg>
);
