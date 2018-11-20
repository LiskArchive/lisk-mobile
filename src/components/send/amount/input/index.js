import React from 'react';
import { View, Text } from 'react-native';
import Input from '../../../toolBox/input';
import withTheme from '../../../withTheme';
import getStyles from './styles';

const AmountInput = ({
  currency, valueInCurrency, styles, ...rest
}) => (
  <View>
    <Input
      {...rest}
      innerStyles={{
        inputLabel: styles.inputLabel,
        input: styles.input,
      }}
    />

    <View style={styles.currencyContainer}>
      <Text style={[styles.currencyText, styles.theme.currencyText]}>
        {`~ ${valueInCurrency} ${currency}`}
      </Text>
    </View>
  </View>
);

export default withTheme(AmountInput, getStyles());
