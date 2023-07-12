import React from 'react';
import { Svg, Path } from 'react-native-svg';

export default ({ color, style }) => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={style}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.05927 5C3.27348 5 1 7.23011 1 9.99965C1 12.7692 3.27348 14.9993 6.05927 14.9993C8.57992 14.9993 10.6811 13.1735 11.0583 10.7743H14.3927L14.3927 13.3865C14.3927 13.7455 14.6837 14.0365 15.0427 14.0365C15.4017 14.0365 15.6927 13.7455 15.6927 13.3865L15.6927 10.7743H16.5974L16.5974 12.2991C16.5974 12.6581 16.8884 12.9491 17.2474 12.9491C17.6064 12.9491 17.8974 12.6581 17.8974 12.2991L17.8974 10.7743H18.3496C18.7086 10.7743 18.9996 10.4833 18.9996 10.1243C18.9996 9.76531 18.7086 9.47429 18.3496 9.47429H11.091C10.825 6.95344 8.66653 5 6.05927 5ZM2.3 9.99965C2.3 7.9647 3.97471 6.3 6.05927 6.3C8.14382 6.3 9.81853 7.9647 9.81853 9.99965C9.81853 12.0346 8.14382 13.6993 6.05927 13.6993C3.97471 13.6993 2.3 12.0346 2.3 9.99965Z"
      fill={color || '#8A8CA2'}
    />
  </Svg>
);
