import React from 'react';
import { Svg, Path } from 'react-native-svg';

export default ({ size = 1.7 }) => (
  <Svg
    width={size * 25}
    height={size * 24}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M9.5 22H15.5C20.5 22 22.5 20 22.5 15V9C22.5 4 20.5 2 15.5 2H9.5C4.5 2 2.5 4 2.5 9V15C2.5 20 4.5 22 9.5 22Z"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M9.5 10C10.6046 10 11.5 9.10457 11.5 8C11.5 6.89543 10.6046 6 9.5 6C8.39543 6 7.5 6.89543 7.5 8C7.5 9.10457 8.39543 10 9.5 10Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3.17004 18.9486L8.10004 15.6386C8.89004 15.1086 10.03 15.1686 10.74 15.7786L11.07 16.0686C11.85 16.7386 13.11 16.7386 13.89 16.0686L18.05 12.4986C18.83 11.8286 20.09 11.8286 20.87 12.4986L22.5 13.8986"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
