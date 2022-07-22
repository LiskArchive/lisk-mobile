import React from 'react';
import { Svg, Path } from 'react-native-svg';

export default function CaretSvg({ direction, color, style }) {
  let d;

  switch (direction) {
    // TODO: Add missing SVGs according to directions.
    case 'up':
    case 'right':
    case 'down':
    case 'left':
      d =
        'M6.01191 4.56944C5.69741 4.29988 5.66099 3.8264 5.93056 3.51191C6.20012 3.19741 6.6736 3.16099 6.98809 3.43056L6.01191 4.56944ZM13.5 10L13.9881 9.43056C14.1543 9.57304 14.25 9.78106 14.25 10C14.25 10.2189 14.1543 10.427 13.9881 10.5694L13.5 10ZM6.98809 16.5694C6.6736 16.839 6.20012 16.8026 5.93056 16.4881C5.66099 16.1736 5.69741 15.7001 6.01191 15.4306L6.98809 16.5694ZM6.98809 3.43056L13.9881 9.43056L13.0119 10.5694L6.01191 4.56944L6.98809 3.43056ZM13.9881 10.5694L6.98809 16.5694L6.01191 15.4306L13.0119 9.43056L13.9881 10.5694Z';
      break;

    default:
      break;
  }

  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={style}>
      <Path d={d} fillRule="evenodd" clipRule="evenodd" fill={color || '#000000'} />
    </Svg>
  );
}
