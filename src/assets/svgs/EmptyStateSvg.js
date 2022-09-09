import React from 'react'
import { Svg, Path } from 'react-native-svg'

import { useTheme } from 'hooks/useTheme'
import { themes, colors } from 'constants/styleGuide'

export default function EmptyStateSvg({ height = 80, width = 216, style }) {
  const { theme } = useTheme()

  const baseColor = theme === themes.light ? colors.light.zodiacBlue : colors.dark.white

  return (
    <Svg width={width} height={height} viewBox="0 0 216 80" fill="none" style={style}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.2653 34.7497H34.6023C31.2315 30.4634 26.8248 25.6928 25.4873 28.2027C24.8079 29.4774 27.2981 32.1725 30.2653 34.7497"
        fill="#2BD67B"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M38.625 34.8049C38.8315 33.3787 39.4223 20.3826 39.8031 16.2416C40.1835 12.1002 40.7578 0 44.1224 0C47.4865 0 49.6064 12.4589 49.503 13.8665"
        fill="#2BD67B"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M44.5093 34.8044C49.8107 28.0066 57.0193 17.282 56.5531 9.029C56.5221 8.48017 56.0704 8.13154 55.5145 8.17174C47.9149 8.72327 42.2374 26.6983 40.0693 34.7491C40.2119 34.751 44.5093 34.8044 44.5093 34.8044"
        fill="#2BD67B"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.3848 27.5202C28.4231 28.3361 31.3485 31.626 33.8088 34.7528L34.6041 34.7493C31.7775 31.1437 28.2719 27.2535 26.3848 27.5202"
        fill={baseColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M38.6172 34.8042C38.2517 26.6377 37.1873 13.0363 34.1808 12.9493C29.9344 12.8272 34.9162 33.5492 35.3965 34.7489L38.6172 34.8042Z"
        fill="#2BD67B"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M39.8623 34.7456C39.9316 34.7456 40.0002 34.7479 40.0688 34.749C41.5853 29.1212 44.817 18.6466 49.2213 12.6632L49.3612 12.4653C49.358 12.2975 49.2593 11.6579 49.161 11.031C44.3931 16.4988 40.5009 28.5901 38.7998 34.7873V34.7885C39.1504 34.761 39.5046 34.7456 39.8623 34.7456"
        fill="#0C152E"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.19434 70.8641H134.007V61.7693H1.19434V70.8641Z"
        stroke={baseColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M134.005 70.8641H214.801V61.7693H134.005V70.8641Z"
        fill={baseColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M134.005 70.8641H214.801V61.7693H134.005V70.8641Z"
        stroke={baseColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M55.3099 25.9644C55.1791 25.8133 54.9479 25.8021 54.8014 25.9385C53.6833 26.9805 49.1924 31.1659 45.3315 34.7878H50.2447C52.278 33.5905 53.8482 32.6482 54.0469 32.4812C54.6561 31.9888 54.5977 32.1569 54.8308 32.2976C56.6114 33.7157 58.3446 33.3825 58.3446 33.3825C58.1977 29.5994 56.048 26.8135 55.3099 25.9644"
        fill="#2BD67B"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.6572 61.7686H53.4916V34.7497H26.6572V61.7686Z"
        stroke={baseColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M83.6812 61.7692H193.742V44.2178H83.6812V61.7692Z"
        fill="#4070F4"
      />
      <Path d="M121.132 44.5031V61.7678" stroke={baseColor} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M193.743 46.7397H99.927L98.0151 44.2178H193.743V46.7397Z"
        fill="#254898"
      />
      <Path d="M101.515 31.8485H200.925" stroke={baseColor} />
      <Path d="M101.515 36.6301H200.925" stroke={baseColor} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M101.515 40.8718V27.5085H205.582V24.1626H101.515H98.0151V27.5085V40.8718V44.2173H101.515H205.582V40.8718H101.515Z"
        fill="#4070F4"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M101.516 41.0068H135.617V27.3745H101.516V41.0068Z"
        stroke={baseColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M135.615 41.0068H200.924V27.3745H135.615V41.0068Z"
        stroke={baseColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M156.429 61.7681H159.695V45.4778H156.429V61.7681Z"
        fill="#254898"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M143.126 31.6409V79.9992L151.884 75.098L158.065 79.9992V31.6409H143.126Z"
        fill="#2BD67B"
      />
    </Svg>
  )
}
