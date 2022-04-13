import React from 'react';
import { View, Image } from 'react-native';
import { getTxConstant, moduleAssetNameIdMap } from 'constants/transactions';
import { colors, themes } from 'constants/styleGuide';
import Avatar from '../avatar';
import Icon from '../toolBox/icon';
import withTheme from '../withTheme';
import getStyles from './styles';

const Symbol = ({
  token,
  theme,
  direction,
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
  if (moduleAssetId === moduleAssetNameIdMap.transfer) {
    return <Avatar address={address} size={40} style={styles.theme.avatar} />;
  }
  return (
    <Image
      source={getTxConstant({ moduleAssetId }).image(themes[theme])}
      style={styles.image}
    />
  );
};

export default withTheme(Symbol, getStyles());
