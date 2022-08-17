import React from 'react';
import { View, Image } from 'react-native';
import { getTxConstant, moduleCommandNameIdMap } from 'modules/SendToken/constants';
import { colors, themes } from 'constants/styleGuide';
import Avatar from 'components/shared/avatar';
import Icon from 'components/shared/toolBox/icon';
import withTheme from 'components/shared/withTheme';
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
  if (moduleAssetId === moduleCommandNameIdMap.transfer) {
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
