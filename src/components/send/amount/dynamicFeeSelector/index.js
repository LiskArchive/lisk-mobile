import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { translate } from 'react-i18next';
import FormattedNumber from '../../../formattedNumber';
import { fromRawLsk } from '../../../../utilities/conversions';
import withTheme from '../../../withTheme';
import getStyles from './styles';

const DynamicFeeSelector = ({
  data,
  value,
  onChange,
  tokenType,
  styles,
  feeCalculator,
  t,
}) => (
  <View style={styles.wrapper}>
    <Text style={[styles.label, styles.theme.label]}>
      {t('Processing Speed')}
    </Text>

    <View style={[styles.container, styles.theme.container]}>
      {Object.keys(data).map((key, index) => {
        const isSelected = key === value;
        const isFirst = index === 0;
        const isLast = index === Object.keys(data).length - 1;

        return (
          <TouchableOpacity
            key={key}
            onPress={() => onChange(key)}
            style={[
              styles.item,
              isFirst ? styles.itemFirst : {},
              isLast ? styles.itemLast : {},
              isSelected ? styles.selectedItem : {},
              {
                width: `${100 / Object.keys(data).length}%`,
              },
            ]}
          >
            <Text style={[
              styles.itemLabel,
              styles.theme.itemLabel,
              isSelected ? styles.selectedItemLabel : {},
            ]}>
              {key}
            </Text>

            <FormattedNumber
              type={Text}
              tokenType={tokenType}
              style={[
                styles.itemValue,
                styles.theme.itemValue,
                isSelected ? styles.selectedItemValue : {},
              ]}
            >
              {fromRawLsk(feeCalculator(data[key]))}
            </FormattedNumber>

            <View style={[styles.separator, styles.theme.separator]} />
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

export default withTheme(translate()(DynamicFeeSelector), getStyles());
