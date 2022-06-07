import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Input from 'components/shared/toolBox/input';
import withTheme from 'components/shared/withTheme';
import getStyles from './styles';

const AmountInput = ({
  currency,
  valueInCurrency,
  styles,
  sendMaximumLabel,
  sendMaximum,
  errorMessage,
  ...rest
}) => (
  <View>
    <View style={styles.row}>
      <Text style={[styles.inputLabel, styles.theme.label]}>{rest.label}</Text>
      <TouchableOpacity onPress={sendMaximum} style={styles.sendMaximumButton}>
        <Text style={styles.sendMaximumText}>
          {sendMaximumLabel}
        </Text>
      </TouchableOpacity>
    </View>
    {valueInCurrency ? (
      <View style={styles.currencyContainer}>
        <Text style={[styles.currencyText, styles.theme.currencyText]} testID="currency-amount">
          ~ {`${valueInCurrency} ${currency}`}
        </Text>
      </View>
    ) : null}
    <Input {...rest} innerStyles={{ input: styles.input }} label={undefined} error={errorMessage} accessibilityLabel="amount-input" />
  </View>
);

export default withTheme(AmountInput, getStyles());
