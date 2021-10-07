import React from 'react';
import { View, Image } from 'react-native';
import Avatar from '../avatar';
import Icon from '../toolBox/icon';
import { getTxConstant, moduleAssetNameIdMap } from '../../../constants/transactions';
import withTheme from '../withTheme';
import getStyles from './styles';
import { colors, themes } from '../../../constants/styleGuide';

const Symbol = ({
  token,
  theme,
  direction,
  sender,
  recipient,
  address,
  styles,
  moduleAssetId,
}) => {
  if (token !== 'LSK') {
    return (
      <View
        style={[styles.transactionIcon, styles.theme[`${direction}Symbol`]]}
      >
        <Icon
          name={direction}
          size={14}
          color={
            direction === 'outgoing'
              ? colors[theme].outgoingArrow
              : colors[theme].ufoGreen
          }
        />
      </View>
    );
  }
  if (moduleAssetId === moduleAssetNameIdMap.transfer && sender !== recipient) {
    return <Avatar address={address} size={40} style={styles.theme.avatar} />;
  }
  return (
    <Image
      source={getTxConstant({ moduleAssetId })?.image?.(themes[theme])}
      style={styles.image}
    />
  );
};

export default withTheme(Symbol, getStyles());
