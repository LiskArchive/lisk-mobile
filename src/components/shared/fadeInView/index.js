import React, { useRef } from 'react'
import { Animated } from 'react-native'

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
    }).start()
  }, [fadeAnim])

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  )
}

export default FadeInView
