import React from 'react';
import { Svg, Path } from 'react-native-svg';

export default ({ size = 1 }) => (
  <Svg width={size * 40} height={size * 33} viewBox="0 0 40 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M31.4544 11.8631L29.9544 11.8598L29.9514 13.2061L31.2896 13.354L31.4544 11.8631ZM31.4545 11.8182L32.9545 11.8216V11.8182H31.4545ZM12.3423 8.64483L12.1204 10.1283L13.3577 10.3134L13.7619 9.12939L12.3423 8.64483ZM14 28.0455C14.8284 28.0455 15.5 27.3739 15.5 26.5455C15.5 25.717 14.8284 25.0455 14 25.0455V28.0455ZM28 25.0455C27.1716 25.0455 26.5 25.717 26.5 26.5455C26.5 27.3739 27.1716 28.0455 28 28.0455V25.0455ZM32.9544 11.8665L32.9545 11.8216L29.9545 11.8148L29.9544 11.8598L32.9544 11.8665ZM39.5 19.1818C39.5 14.6184 36.0526 10.8623 31.6193 10.3722L31.2896 13.354C34.2199 13.678 36.5 16.1647 36.5 19.1818H39.5ZM30.6364 28.0455C35.5316 28.0455 39.5 24.0771 39.5 19.1818H36.5C36.5 22.4202 33.8748 25.0455 30.6364 25.0455V28.0455ZM11 25.0455C6.85787 25.0455 3.5 21.6875 3.5 17.5455H0.5C0.5 23.3444 5.201 28.0455 11 28.0455V25.0455ZM3.5 17.5455C3.5 13.4034 6.85787 10.0455 11 10.0455V7.04545C5.201 7.04545 0.5 11.7465 0.5 17.5455H3.5ZM11 10.0455C11.3819 10.0455 11.7559 10.0738 12.1204 10.1283L12.5643 7.16134C12.0529 7.08484 11.5305 7.04545 11 7.04545V10.0455ZM21.6364 0.5C16.6633 0.5 12.4431 3.70638 10.9228 8.16027L13.7619 9.12939C14.8803 5.8529 17.9855 3.5 21.6364 3.5V0.5ZM32.9545 11.8182C32.9545 5.5673 27.8872 0.5 21.6364 0.5V3.5C26.2304 3.5 29.9545 7.22416 29.9545 11.8182H32.9545ZM14 25.0455H11V28.0455H14V25.0455ZM30.6364 25.0455H28V28.0455H30.6364V25.0455Z" fill="#4070F4" />
    <Path d="M21.0034 16.4585V31.0946" stroke="#4070F4" stroke-width="3" stroke-linecap="round" />
    <Path d="M16.335 20.7647L21.0032 16.3454L25.6714 20.7646" stroke="#4070F4" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
  </Svg>
);