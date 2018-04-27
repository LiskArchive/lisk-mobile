import React from 'react';
import { Text } from 'react-native';
import moment from 'moment';

/**
 * Convert Lisk timestamp to Valid JS Date object
 *
 * @param {Date} value - Javascript Date object
 * @return {Date} - Native Js Date object
 */
const fromLiskTimestamp = value =>
  new Date((((Date.UTC(2016, 4, 24, 17, 0, 0, 0) / 1000) + value) * 1000));

/**
 * Converts the given Lisk timestamp to moment prettified time
 * and wraps the value in Text component
 *
 * @param {Object} params
 * @param {Object} params.children - React native children passed to Component
 * @param {Object} params.style - The style rules passed from parent
 *
 * @returns {Object} React native Text component
 */
const FormattedDate = ({ children, style }) => {
  const absoluteDate = fromLiskTimestamp(children);
  return <Text style={style}>{ moment(absoluteDate).format('LL') }</Text>;
};

export default FormattedDate;
