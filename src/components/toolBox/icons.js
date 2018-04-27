import React from 'react';
import { Icon as NativeIcon } from 'react-native-elements';

/**
 * This is thematic wrapper over Icon component of react native elements
 *
 * @param {Object} props
 * @param {String} props.tintColor - A valid Hex color code
 * @param {String} props.name - An icon name existing in our icons list
 * @param {Number} props.size - THe size of the icon in pixels, defaults to 35
 */
const Icon = ({ tintColor, name, size }) =>
  <NativeIcon name={name} size={size || 35} color={tintColor} />;

export default Icon;
