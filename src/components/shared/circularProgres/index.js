import React from 'react'
import { View } from 'react-native'
import { Circle, Svg } from 'react-native-svg'
import { colors } from 'constants/styleGuide'

const CircularProgress = ({ style, value, max }) => {
  let percentage = (value * 100) / max
  percentage = percentage > 100 ? 100 : percentage
  const error = value > max
  const radius = 45
  const circunference = Math.PI * (radius * 2)
  const offset = ((100 - percentage) / 100) * circunference
  const defaultDimensions = {
    width: 20,
    height: 20,
  }

  return (
    <View style={[style, (!style || (!style.width && !style.height)) && defaultDimensions]}>
      <Svg height="100%" width="100%" viewBox="0 0 100 100">
        <Circle
          cx="50"
          cy="50"
          r={radius}
          strokeDasharray={circunference}
          strokeDashoffset="0"
          stroke={colors.light.platinum}
          strokeWidth="4"
          fill="transparent"
        />
        <Circle
          cx="50"
          cy="50"
          r={radius}
          rotation="-90"
          origin="50"
          strokeDasharray={circunference}
          strokeDashoffset={offset}
          stroke={error ? colors.light.burntSieanna : colors.light.ultramarineBlue}
          strokeWidth="4"
          fill="transparent"
        />
      </Svg>
    </View>
  )
}

export default CircularProgress
