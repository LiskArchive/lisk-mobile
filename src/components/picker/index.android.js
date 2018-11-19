import React from 'react';
import { Picker } from 'react-native';

const PickerAndroid = ({
  value, onChange, options, valueStyle = {},
}) => (
  <Picker
    selectedValue={value}
    onValueChange={onChange}
    style={{
      width: 100,
      height: 24,
      color: valueStyle.color || 'black',
    }}
  >
    {options.map(o => (
      <Picker.Item key={o} value={o} label={o} />
    ))}
  </Picker>
);

export default PickerAndroid;
