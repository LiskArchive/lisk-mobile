import React from 'react'
import { Svg, Path } from 'react-native-svg'

import colors from 'constants/styleGuide/colors'

export default function CircleSvg({
  color = colors.light.blueGray,
  height = 24,
  width = 24,
  style,
}) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" style={style}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
        fill={color}
      />
    </Svg>
  )
}
