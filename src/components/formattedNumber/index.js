import React from 'react';
import numeral from 'numeral';
import { Text } from 'react-native';

const FormattedNumber = ({
  val, children, type, style,
}) => {
  const Element = type || Text;
  const formatedNumber = numeral(val || children).format('0,0.[0000000000000]');
  return <Element style={style}>{formatedNumber} LSK</Element>;
};

export default FormattedNumber;
