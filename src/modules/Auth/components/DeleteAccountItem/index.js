import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import withTheme from 'components/shared/withTheme';
import Avatar from 'components/shared/avatar';
import { stringShortener } from 'utilities/helpers';
import { P } from 'components/shared/toolBox/typography';
import Icon from 'components/shared/toolBox/icon';
import { colors } from 'constants/styleGuide';
import getStyles from './styles';

const SwipeableAccountItem = ({ account, styles, onPress, testID }) => {
  const { address, name: username } = account.metadata;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} testID={testID}>
      <Avatar address={address} size={45} style={styles.avatar} />
      <View style={styles.content}>
        {!!username && <P style={[styles.username, styles.theme.username]}>{username}</P>}
        <P style={[styles.address, styles.theme.address]}>{stringShortener(address, 5, 5)}</P>
      </View>
      <Icon name="delete-bookmark" size={20} color={colors.light.furyRed} />
    </TouchableOpacity>
  );
};

export default withTheme(SwipeableAccountItem, getStyles());
