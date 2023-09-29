import React from 'react';
import { Svg, Path } from 'react-native-svg';

export default ({ color, style }) => (
  <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={style}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.00117 0.25C8.16946 0.25 7.5443 0.834102 7.3086 1.55901H6.35078C5.71565 1.55901 5.20078 2.07388 5.20078 2.70901V2.95H3.20078C2.56565 2.95 2.05078 3.46487 2.05078 4.1V16.6C2.05078 17.2351 2.56565 17.75 3.20078 17.75H14.8008C15.4359 17.75 15.9508 17.2351 15.9508 16.6V4.1C15.9508 3.46487 15.4359 2.95 14.8008 2.95H12.8008V2.70901C12.8008 2.07388 12.2859 1.55901 11.6508 1.55901H10.6937C10.458 0.834102 9.83287 0.25 9.00117 0.25ZM12.7735 4.25C12.6594 4.76492 12.2001 5.15 11.6508 5.15H6.35078C5.80151 5.15 5.34218 4.76492 5.22803 4.25H3.35078V16.45H14.6508V4.25H12.7735ZM8.5078 2.15187C8.53513 1.73865 8.81403 1.55 9.00117 1.55C9.18831 1.55 9.46721 1.73865 9.49453 2.15187C9.5189 2.52033 9.82125 2.85901 10.2464 2.85901H11.5008V3.85H6.50078V3.19099V2.85901H7.75593C8.18109 2.85901 8.48344 2.52033 8.5078 2.15187ZM4.75078 8.1C4.75078 7.74101 5.0418 7.45 5.40078 7.45H12.6008C12.9598 7.45 13.2508 7.74101 13.2508 8.1C13.2508 8.45899 12.9598 8.75 12.6008 8.75H5.40078C5.0418 8.75 4.75078 8.45899 4.75078 8.1ZM4.75078 10.8C4.75078 10.441 5.0418 10.15 5.40078 10.15H12.6008C12.9598 10.15 13.2508 10.441 13.2508 10.8C13.2508 11.159 12.9598 11.45 12.6008 11.45H5.40078C5.0418 11.45 4.75078 11.159 4.75078 10.8ZM5.40078 12.85C5.0418 12.85 4.75078 13.141 4.75078 13.5C4.75078 13.859 5.0418 14.15 5.40078 14.15H12.6008C12.9598 14.15 13.2508 13.859 13.2508 13.5C13.2508 13.141 12.9598 12.85 12.6008 12.85H5.40078Z"
      fill={color || '#8A8CA2'}
    />
  </Svg>
);
