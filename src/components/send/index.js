import React from 'react';
import { View } from 'react-native';
import MultiStep from '../multiStep';
import Form from './form';
import Confirm from './confirm';
import Result from './result';
import styles from './styles';

const Send = ({ navigation }) => (
  <View style={styles.wrapper}>
    <MultiStep finalCallback={() => {
      navigation.navigate({ routeName: 'OwnWallet' });
    }}>
      <Form/>
      <Confirm />
      <Result />
    </MultiStep>
  </View>
);

export default Send;
