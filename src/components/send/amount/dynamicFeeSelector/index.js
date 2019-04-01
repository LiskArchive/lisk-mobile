import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { translate } from 'react-i18next';
import FormattedNumber from '../../../formattedNumber';
import { fromRawLsk } from '../../../../utilities/conversions';
import { B, Small } from '../../../toolBox/typography';
import withTheme from '../../../withTheme';
import getStyles from './styles';

const DynamicFeeSelector = ({
  value, data, selected, isLoading,
  tokenType, onChange, styles, t,
}) => {
  let content;

  if (isLoading) {
    content = (
      <View style={[styles.loadingContainer, styles.item]}>
        <View style={[styles.loadingDots]}>
          <View style={styles.loadingDot} />
          <View style={styles.loadingDot} />
          <View style={styles.loadingDot} />
        </View>

        <Small style={[styles.loadingText, styles.theme.loadingText]}>
          {t('Looking for processing speed options...')}
        </Small>
      </View>
    );
  } else {
    const itemsToShow = Object.keys(data).filter(key => key !== 'Medium');

    content = (
      <React.Fragment>
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
            <Small style={[
              styles.itemLabel,
              styles.theme.itemLabel,
              key === selected ? styles.selectedItemLabel : null,
            ]}>
              {key}
            </Small>
          </TouchableOpacity>
        ))}
      </React.Fragment>
    );
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.labelContainer}>
        <Small style={[styles.label, styles.theme.label]}>
          {t('Processing speed')}
        </Small>

        {isLoading ? null : (
          <FormattedNumber
            type={B}
            tokenType={tokenType}
            style={[styles.value, styles.theme.value]}
          >
            {fromRawLsk(value)}
          </FormattedNumber>
        )}
      </View>

      <View style={[styles.container, styles.theme.container]}>
        {content}
      </View>
    </View>
  );
};

export default withTheme(translate()(DynamicFeeSelector), getStyles());
