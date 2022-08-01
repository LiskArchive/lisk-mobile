import React from 'react';
import { Svg, Path, Circle } from 'react-native-svg';

export default function CircleCrossedSvg({
  color = '#FF4557',
  height = 20,
  width = 20,
  style
}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 47 47"
      fill="none"
      style={style}
    >
      <Circle cx="23.5" cy="23.5" r="22.5" stroke={color} strokeWidth="2"/>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.4118 16.8472C32.7826 16.4936 32.7826 15.9203 32.4118 15.5667C32.0411 15.2131 31.44 15.2131 31.0693 15.5667L23.6617 22.6317L16.9246 16.2061C16.5538 15.8525 15.9527 15.8525 15.582 16.2061C15.2113 16.5597 15.2113 17.133 15.582 17.4865L22.3192 23.9121L15.582 30.3377C15.2113 30.6913 15.2113 31.2646 15.582 31.6182C15.9527 31.9718 16.5538 31.9718 16.9246 31.6182L23.6617 25.1926L31.0693 32.2576C31.44 32.6112 32.0411 32.6112 32.4118 32.2576C32.7826 31.904 32.7826 31.3307 32.4118 30.9771L25.0043 23.9121L32.4118 16.8472Z"
        fill={color}
      />
    </Svg>
  );
}
