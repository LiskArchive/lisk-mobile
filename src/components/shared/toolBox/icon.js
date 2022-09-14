import React from 'react';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import iconsConfig from 'assets/fonts/icons/selection.json';

const Icomoon = createIconSetFromIcoMoon(iconsConfig);

/**
 * Creates icon from Icomoon selection
 * in order to show an icon, the icon should exist in the font file
 *
 * @param {Object} props
 * @param {String} props.color - A valid Hex color code
 * @param {String} props.name - An icon name existing in our icons list
 * @param {Number} props.size - THe size of the icon in pixels, defaults to 35
 * @param {Object} props.style - styles from stylesheet
 * @param {Function} props.onPress - onPress event handler function
 */
const Icon = ({ name, size, color, style, onPress }) => (
  <Icomoon name={name} size={size || 35} color={color} style={style} onPress={onPress} />
);

export default Icon;
