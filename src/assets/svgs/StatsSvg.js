import React from 'react'
import { Svg, Path } from 'react-native-svg'

export default function StatsSvg({ width, height, style }) {
  return (
    <Svg width={`${width || 20}`} height={`${height || 20}`} viewBox="0 0 20 20" fill="none" style={style}>
      <Path d="M10.3448 0C4.63154 0 0 4.63154 0 10.3448H10.3448V0Z" fill="#FFD0D1" />
      <Path d="M9.65517 0C15.3685 0 20 4.63154 20 10.3448H9.65517V0Z" fill="#254898" />
      <Path d="M10.3448 20C4.63154 20 0 15.3685 0 9.65517H10.3448V20Z" fill="#4070F4" />
      <Path d="M9.65517 20C15.3685 20 20 15.3685 20 9.65517H9.65517V20Z" fill="#2BD67B" />
    </Svg>
  )
}
