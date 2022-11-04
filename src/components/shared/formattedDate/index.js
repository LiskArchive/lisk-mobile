import React from 'react';
import { Text } from 'react-native';
import moment from 'moment';
import 'moment/min/locales';
import { useSelector } from 'react-redux';

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
  transformer = moment,
  format = 'MMM D, YYYY',
}) => {
  const language = useSelector((state) => state.settings.language);

  const Element = type || Text;

  moment.locale(locale || language);

  return <Element style={style}>{transformer(children).format(format)}</Element>;
};

export default FormattedDate;
