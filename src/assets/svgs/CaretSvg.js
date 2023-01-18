import React from 'react';
import { Svg, Path } from 'react-native-svg';

export default function CaretSvg({
  direction = 'right',
  color = 'currentColor',
  height = 20,
  width = 20,
  style,
}) {
  let d;

  switch (direction) {
    case 'right':
      d = 'M6.5 4L13.5 10L6.5 16';
      break;
    case 'down':
      d = 'M4 6.5L10 13.5L16 6.5';
      break;

    case 'left':
      d = 'M13.5 4L6.5 10L13.5 16';
      break;

    case 'up':
      d = 'M16 13.5L10 6.5L4 13.5';
      break;

    default:
      break;
  }

  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" style={style}>
      <Path d={d} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" stroke={color} />
    </Svg>
  );
}
