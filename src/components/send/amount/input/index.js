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
      innerStyles={{ input: styles.input }}
    />

    {valueInCurrency ?
      <View style={styles.currencyContainer}>
        <Text style={[styles.currencyText, styles.theme.currencyText]}>
          {`${valueInCurrency} ${currency}`}
        </Text>
      </View> : null
    }
  </View>
);

export default withTheme(AmountInput, getStyles());
