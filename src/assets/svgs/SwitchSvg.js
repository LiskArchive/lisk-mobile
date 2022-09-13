import React from 'react';
import { Svg, Path } from 'react-native-svg';

export default ({ width = 16, height = 16, style }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <Path
        d="M12.8 1.59999L14.6385 3.14265L13.1988 5.06287"
        stroke="white"
        stroke-width="1.3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M14.4 3.20094C14.4 3.20094 11.2101 3.00834 8.00002 7.99995C4.78993 12.9916 1.60003 12.799 1.60003 12.799"
        stroke="white"
        stroke-width="1.3"
        stroke-linecap="round"
      />
      <Path
        d="M12.8 14.4L14.6385 12.8573L13.1988 10.9371"
        stroke="white"
        stroke-width="1.3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M14.4 12.7991C14.4 12.7991 12.0008 12.9439 9.2699 9.72638M1.60003 3.20102C1.60003 3.20102 4.12346 3.04866 6.94014 6.52704"
        stroke="white"
        stroke-width="1.3"
        stroke-linecap="round"
      />
    </Svg>
  );
};
