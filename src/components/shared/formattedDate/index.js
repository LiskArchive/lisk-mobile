import React from 'react';
import { Text } from 'react-native';
import moment from 'moment';
import 'moment/min/locales';

/**
 * Converts the timestamp to moment prettified time and wraps the value in a component
 *
 * @param {Object} params
 * @param {Object} params.children - React native children passed to Component
 * @param {Object} params.style - The style rules passed from parent
 * @param {Object} params.type - Type of the React Component
 * @param {String} params.format - Date format
 *
 * @returns {Object} React native Text component
 */
const FormattedDate = ({
  children,
  style,
  type,
  locale,
  format = 'MMM D, YYYY',
}) => {
  const Element = type || Text;

  moment.locale(locale);

  return (
    <Element style={style}>
      {moment(children).format(format)}
    </Element>
  );
};

export default FormattedDate;
