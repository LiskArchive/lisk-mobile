import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { translate } from 'react-i18next';
import FormattedNumber from '../../../formattedNumber';
import { fromRawLsk } from '../../../../utilities/conversions';
import { B } from '../../../toolBox/typography';
import withTheme from '../../../withTheme';
import getStyles from './styles';

const DynamicFeeSelector = ({
  value,
  data,
  selected,
  tokenType,
  onChange,
  styles,
  t,
}) => {
  const itemsToShow = Object.keys(data).filter(key => key !== 'Medium');

  return (
    <View style={styles.wrapper}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, styles.theme.label]}>
          {t('Processing speed')}
        </Text>

        <FormattedNumber
          type={B}
          tokenType={tokenType}
          style={styles.value}
        >
          {fromRawLsk(value)}
        </FormattedNumber>
      </View>

      <View style={[styles.container, styles.theme.container]}>
        {itemsToShow.map((key, index) => (
          <TouchableOpacity
            key={key}
            onPress={() => onChange(key)}
            style={[
              styles.item,
              key === selected ? styles.selectedItem : null,
              index === 0 ? styles.itemFirst : null,
              index === itemsToShow.length - 1 ? styles.itemLast : null,
              {
                width: `${100 / itemsToShow.length}%`,
              },
            ]}
          >
            <Text style={[
              styles.itemLabel,
              styles.theme.itemLabel,
              key === selected ? styles.selectedItemLabel : null,
            ]}>
              {key}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default withTheme(translate()(DynamicFeeSelector), getStyles());
