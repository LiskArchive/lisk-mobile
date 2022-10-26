import React from 'react';
import { Svg, Path } from 'react-native-svg';
import colors from '../../constants/styleGuide/colors';

export default function SearchSvg({
  color = colors.light.mountainMist,
  height = 20,
  width = 20,
  style,
}) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" style={style}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.22222 2.25C5.37157 2.25 2.25 5.37157 2.25 9.22222C2.25 13.0729 5.37157 16.1944 9.22222 16.1944C10.8773 16.1944 12.3977 15.6177 13.5934 14.6543L16.4696 17.5306C16.7625 17.8234 17.2374 17.8234 17.5303 17.5306C17.8232 17.2377 17.8232 16.7628 17.5303 16.4699L14.6541 13.5937C15.6177 12.3979 16.1944 10.8774 16.1944 9.22222C16.1944 5.37157 13.0729 2.25 9.22222 2.25ZM13.161 13.021C14.1105 12.0368 14.6944 10.6977 14.6944 9.22222C14.6944 6.2 12.2444 3.75 9.22222 3.75C6.2 3.75 3.75 6.2 3.75 9.22222C3.75 12.2444 6.2 14.6944 9.22222 14.6944C10.6976 14.6944 12.0366 14.1106 13.0208 13.1613C13.0407 13.1353 13.0625 13.1103 13.0863 13.0866C13.1101 13.0628 13.1351 13.0409 13.161 13.021Z"
        fill={color}
      />
    </Svg>
  );
}
