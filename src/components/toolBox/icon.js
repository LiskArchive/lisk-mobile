import React from 'react';
import { Icon as NativeIcon } from 'react-native-elements';
import SvgUri from 'react-native-svg-uri';

/**
 * Creates an Icon element, normalizing the property names to match
 * the required properties of SvgUri or Icon components.
 * If name is passed as string, this works as a thematic wrapper over
 * the Icon component of react native elements
 * and If the src is passed as svg content, it exports an SvgUri component
 *
 * @param {Object} props
 * @param {String} props.tintColor - A valid Hex color code
 * @param {String} props.name - An icon name existing in our icons list
 * @param {Number} props.size - THe size of the icon in pixels, defaults to 35
 * @param {Object} props.src - SVG image asset
 */
const Icon = ({
  tintColor, name, size, style, onPress, src,
}) => {
  let Element = null;
  let props = null;
  if (typeof name === 'string') {
    Element = NativeIcon;
    props = {
      name,
      size: (size || 35),
      color: tintColor,
      iconStyle: style,
    };
  } else {
    Element = SvgUri;
    props = {
      width: (size || 35),
      height: (size || 35),
      source: src,
      style,
    };
  }

  return (<Element {...props} onPress={onPress} />);
};

export default Icon;
