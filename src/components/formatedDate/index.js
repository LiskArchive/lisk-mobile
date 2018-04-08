import React  from 'react';
import { Text } from 'react-native';
import moment from 'moment';

/**
 * 
 * @param {Date} value - Javascript Date object
 */
const fromLiskTimestamp = value =>
  new Date((((Date.UTC(2016, 4, 24, 17, 0, 0, 0) / 1000) + value) * 1000));

const FormatedDate = ({ children, style }) => {
  const absoluteDate = fromLiskTimestamp(children);
  return <Text style={style}>{ moment(absoluteDate).format('LL') }</Text>
}

export default FormatedDate;
