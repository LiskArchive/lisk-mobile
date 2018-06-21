import React from 'react';
import numeral from 'numeral';
import { Text } from 'react-native';

const FormattedNumber = ({ val, children }) => {
  const formatedNumber = numeral(val || children).format('0,0.[0000000000000]');
  return <Text>{formatedNumber}</Text>;
};

export default FormattedNumber;
