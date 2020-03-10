import React from 'react';
import { View, Text } from 'react-native';
import Input from '../../../../../shared/toolBox/input';
import withTheme from '../../../../../shared/withTheme';
import getStyles from './styles';

const AmountInput = ({
  currency, valueInCurrency, styles, ...rest
}) => (
  <View>
    <Input
      {...rest}
      innerStyles={{ input: styles.input, inputLabel: styles.theme.label }}
    />

    {valueInCurrency ? (
      <View style={styles.currencyContainer}>
        <Text style={[styles.currencyText, styles.theme.currencyText]}>
          <Text style={styles.currencyPrefix}>~&nbsp;</Text>
          {`${valueInCurrency} ${currency}`}
        </Text>
      </View>
    ) : null}
  </View>
);

export default withTheme(AmountInput, getStyles());
