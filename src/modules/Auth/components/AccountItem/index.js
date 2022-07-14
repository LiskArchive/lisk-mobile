import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import withTheme from 'components/shared/withTheme';
import Avatar from 'components/shared/avatar';
import { stringShortener } from 'utilities/helpers';
import { P } from 'components/shared/toolBox/typography';
import getStyles from './styles';

const AccountItem = ({
  account, styles, onPress, testID
}) => {
  const { name: username, address } = account.metadata;
  return (
    <TouchableOpacity
      style={[styles.container, styles.theme.container]}
      onPress={onPress}
      testID={testID}
    >
      <Avatar address={address} size={45} style={styles.avatar} />
      <View style={styles.content}>
        {!!username && <P style={[styles.username, styles.theme.username]}>{username}</P>}
        <P style={[styles.address, styles.theme.address]}>
          {stringShortener(address, 5, 5)}
        </P>
      </View>
    </TouchableOpacity>
  );
};

export default withTheme(AccountItem, getStyles());
