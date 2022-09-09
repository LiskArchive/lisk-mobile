import React from 'react'
import { Svg, Path, Circle } from 'react-native-svg'

export default function CircleCheckedSvg({
  color = '#4070F4',
  height = 20,
  width = 20,
  style,
  variant = 'outline',
}) {
  let children
  let viewBox

  switch (variant) {
    case 'outline':
      viewBox = '0 0 80 80'
      children = (
        <>
          <Circle cx="40" cy="40" r="39" stroke={color} strokeWidth="2" />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M54.1981 29.3106C54.8833 29.9957 54.8833 31.1066 54.1981 31.7918L36.7945 49.1955C36.7164 49.2736 36.5897 49.2736 36.5116 49.1955L27.2057 39.8895C26.5205 39.2044 26.5205 38.0935 27.2057 37.4083C27.8909 36.7231 29.0018 36.7231 29.687 37.4083L36.6531 44.3744L51.7169 29.3106C52.4021 28.6254 53.513 28.6254 54.1981 29.3106Z"
            fill={color}
          />
        </>
      )
      break

    case 'fill':
      viewBox = '0 0 20 20'
      children = (
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C12.3051 1 14.4077 1.86656 16 3.29168C16.22 3.48858 16.4302 3.69614 16.6299 3.91354L9.94099 11.1311C9.90244 11.1727 9.83704 11.1739 9.79693 11.1338L8.03937 9.37623C7.74724 9.08409 7.2736 9.08409 6.98147 9.37623C6.68933 9.66836 6.68933 10.142 6.98147 10.4341L9.68486 13.1375C9.80512 13.2578 10.0012 13.2541 10.1169 13.1295L17.558 5.11163C17.6405 5.23891 17.7198 5.3684 17.796 5.5C18.5617 6.82378 19 8.36071 19 10Z"
          fill={color}
        />
      )
      break

    default:
      break
  }

  return (
    <Svg width={width} height={height} viewBox={viewBox} fill="none" style={style}>
      {children}
    </Svg>
  )
}
