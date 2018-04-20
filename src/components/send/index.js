import React from 'react';
import { Text } from 'react-native';
import MultiStep from '../multiStep';
import Form from './form';
import Confirm from './confirm';
import Result from './result';

export default () => (
  <MultiStep finalCallback={() => {}}>
    <Form/>
    <Confirm />
    <Result />
  </MultiStep>
);
