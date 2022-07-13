import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import withTheme from 'components/shared/withTheme';
import Avatar from 'components/shared/avatar';
import { stringShortener } from 'utilities/helpers';
import { P } from 'components/shared/toolBox/typography';
import SwipeableRow from 'components/shared/Swipeable';
import Icon from 'components/shared/toolBox/icon';
import CircleCheckedSvg from 'assets/svgs/CircleCheckedSvg';
import RefreshSvg from 'assets/svgs/RefreshSvg';
import { colors } from 'constants/styleGuide';
import getStyles from './styles';

const SwipeableAccountItem = ({
  account, styles, onPress, testID, theme, active
}) => {
  const { name: username, address } = account.metadata;
  return <SwipeableRow
    leftActions={[
      {
        title: 'Backup',
        color: colors.dark.blueGray,
        icon: () => (
          <RefreshSvg />
        ),
        onPress: () => { },
      }
    ]}
    rightActions={[
      {
        title: 'Edit',
        color: colors.dark.blueGray,
        icon: () => (
          <Icon
            name="edit-bookmark"
            size={20}
            color={colors[theme].white}
          />
        ),
        onPress: () => { },
      },
      {
        title: 'Delete',
        color: colors.dark.furyRed,
        icon: () => (
          <Icon
            name="delete-bookmark"
            size={20}
            color={colors[theme].white}
          />
        ),
        onPress: () => { },
      },
    ]} >
    <TouchableOpacity style={styles.container} onPress={onPress} testID={testID} >
      <Avatar address={address} size={45} style={styles.avatar} />
      <View style={styles.content} >
        {!!username && <P style={styles.username}>{username}</P>}
        <P style={[styles.address, styles.theme.address]}>{stringShortener(address, 5, 5)}</P>
      </View>
      <View>
        {active && <CircleCheckedSvg />}
      </View>
    </TouchableOpacity>
  </SwipeableRow>;
};

export default withTheme(SwipeableAccountItem, getStyles());
