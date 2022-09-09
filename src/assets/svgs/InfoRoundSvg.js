import React from 'react'
import { Svg, Path, Circle } from 'react-native-svg'

export default ({ color }) => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M10.106 7.226C10.722 7.226 11.226 6.722 11.226 6.12C11.226 5.518 10.722 5 10.106 5C9.504 5 9 5.518 9 6.12C9 6.722 9.504 7.226 10.106 7.226ZM9.21 14.163C9.21 14.6617 9.61429 15.066 10.113 15.066V15.066C10.6117 15.066 11.016 14.6617 11.016 14.163V8.969C11.016 8.47029 10.6117 8.066 10.113 8.066V8.066C9.61429 8.066 9.21 8.47029 9.21 8.969V14.163Z"
      fill={color || '#4070F4'}
    />
    <Circle cx="10" cy="10" r="9.25" stroke={color || '#4070F4'} strokeWidth="1.5" />
  </Svg>
)
