import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { translate } from 'react-i18next';
import FormattedNumber from '../../../formattedNumber';
import { fromRawLsk } from '../../../../utilities/conversions';
import { calculateTransactionFee } from '../../../../utilities/api/btc/transactions';
import withTheme from '../../../withTheme';
import getStyles from './styles';

const DynamicFeeSelector = ({
  data,
  value,
  onChange,
  tokenType,
  styles,
  t,
}) => (
  <View style={styles.wrapper}>
    <Text style={[styles.label, styles.theme.label]}>
      {t('Processing Speed')}
    </Text>

    <View style={[styles.container, styles.theme.container]}>
      {Object.keys(data).map(key => (
        <TouchableOpacity
          key={key}
          onPress={() => onChange(data[key])}
          style={[
            styles.item,
            data[key] === value ? styles.selectedItem : {},
            {
              width: `${100 / Object.keys(data).length}%`,
            },
          ]}
        >
          <Text style={[
            styles.itemLabel,
            styles.theme.itemLabel,
            data[key] === value ? styles.selectedItemLabel : {},
          ]}>
            {key}
          </Text>

          <FormattedNumber
            type={Text}
            tokenType={tokenType}
            style={[
              styles.itemValue,
              styles.theme.itemValue,
              data[key] === value ? styles.selectedItemValue : {},
            ]}
          >
            {fromRawLsk(calculateTransactionFee({
              inputCount: 4,
              outputCount: 2,
              dynamicFeePerByte: data[key],
            }))}
          </FormattedNumber>

          <View style={[styles.separator, styles.theme.separator]} />
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

export default withTheme(translate()(DynamicFeeSelector), getStyles());
