import React from 'react';
import { View, Image } from 'react-native';
import Avatar from '../avatar';
import Icon from '../toolBox/icon';
import transactions from '../../../constants/transactions';
import withTheme from '../../shared/withTheme';
import getStyles from './styles';
import { colors, themes } from '../../../constants/styleGuide';

const txTypes = [
  'accountInitialization',
  'setSecondPassphrase',
  'registerDelegate',
  'vote',
];

const Symbol = ({
  token,
  theme,
  direction,
  sender,
  recipient,
  address,
  styles,
  type,
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
  if (type === 0 && sender !== recipient) {
    return <Avatar address={address} size={40} style={styles.theme.avatar} />;
  }
  return (
    <Image
      source={transactions[txTypes[type]].image(themes[theme])}
      style={styles.image}
    />
  );
};

export default withTheme(Symbol, getStyles());
