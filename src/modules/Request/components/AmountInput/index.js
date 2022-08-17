import React from 'react';
import { View, Text } from 'react-native';
import Input from 'components/shared/toolBox/input';
import { useTheme } from 'hooks/useTheme';
import getStyles from './styles';

const AmountInput = ({
  currency,
  valueInCurrency,
  errorMessage,
  ...rest
}) => {
  const { styles } = useTheme({ styles: getStyles() });
  return (
    <View>
      <View style={styles.row}>
        <Text style={[styles.inputLabel, styles.theme.label]}>Amount</Text>
      </View>
      {valueInCurrency ? (
        <View style={styles.currencyContainer}>
          <Text style={[styles.currencyText, styles.theme.currencyText]} testID="currency-amount">
            ~ {`${valueInCurrency} ${currency}`}
          </Text>
        </View>
      ) : null}
      <Input {...rest} innerStyles={{ input: styles.input, containerStyle: styles.inputContainer }} label={undefined} error={errorMessage} accessibilityLabel="amount-input" />
    </View>
  );
};

export default AmountInput;
