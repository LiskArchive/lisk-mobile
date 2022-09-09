import React from 'react'
import { Svg, Path } from 'react-native-svg'
import { themes, colors } from 'constants/styleGuide'

export default ({ theme }) => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.32345 3C9.09918 1.66667 11.0385 1.66667 11.8142 3L18.7958 15C19.5716 16.3333 18.6019 18 17.0504 18H3.08726C1.5358 18 0.566137 16.3333 1.34187 15L8.32345 3ZM9.41378 7.65501C9.41378 7.29326 9.70704 7 10.0688 7C10.4305 7 10.7238 7.29326 10.7238 7.65501V12.345C10.7238 12.7067 10.4305 13 10.0688 13C9.70704 13 9.41378 12.7067 9.41378 12.345V7.65501ZM9.41378 14.65C9.41378 14.291 9.7098 14 10.0688 14C10.4278 14 10.7238 14.291 10.7238 14.65C10.7238 15.009 10.4278 15.3 10.0688 15.3C9.7098 15.3 9.41378 15.009 9.41378 14.65Z"
      fill={theme === themes.light ? colors.light.zodiacBlue : colors.dark.white}
    />
  </Svg>
)
