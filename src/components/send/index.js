import React from 'react';
import MultiStep from '../multiStep';
import Form from './form';
import Confirm from './confirm';
import Result from './result';

const Send = ({ navigation }) => (
  <MultiStep finalCallback={() => {
    navigation.navigate({ routeName: 'OwnWallet' });
  }}>
    <Form/>
    <Confirm />
    <Result />
  </MultiStep>
);

export default Send;
