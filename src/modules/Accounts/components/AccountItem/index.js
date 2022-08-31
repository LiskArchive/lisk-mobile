import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useTheme } from 'hooks/useTheme';
import Avatar from 'components/shared/avatar';
import { stringShortener } from 'utilities/helpers';
import { P } from 'components/shared/toolBox/typography';
import Swipeable from 'components/shared/Swipeable';
import Icon from 'components/shared/toolBox/icon';
import CircleCheckedSvg from 'assets/svgs/CircleCheckedSvg';
import RefreshSvg from 'assets/svgs/RefreshSvg';
import { colors } from 'constants/styleGuide';

import getAccountItemStyles from './styles';

export default function AccountItem({
  account,
  onPress,
  testID,
  active,
  mode = 'screen',
}) {
  const { styles, theme } = useTheme({ styles: getAccountItemStyles() });

  const { name: username, address } = account.metadata;

  return (
    <Swipeable
      leftActions={[
        {
          title: 'Backup',
          color: colors.dark.blueGray,
          icon: () => <RefreshSvg />,
          // TODO: Implement backup action.
          onPress: () => {},
        },
      ]}
      rightActions={[
        {
          title: 'Edit',
          color: colors.dark.blueGray,
          icon: () => <Icon name="edit-bookmark" size={20} color={colors[theme].white} />,
          // TODO: Implement edit action.
          onPress: () => {},
        },
        {
          title: 'Delete',
          color: colors.dark.furyRed,
          icon: () => <Icon name="delete-bookmark" size={20} color={colors[theme].white} />,
          // TODO: Implement delete action.
          onPress: () => {},
        },
      ]}
      enabled={mode === 'modal'}
    >
      <TouchableOpacity
        style={[styles.container, styles.theme.container, styles[mode]]}
        onPress={onPress}
        testID={testID}
      >
        <Avatar address={address} size={45} style={styles.avatar} />

        <View style={styles.content}>
          {!!username && <P style={[styles.username, styles.theme.username]}>{username}</P>}
          <P style={[styles.address, styles.theme.address]}>{stringShortener(address, 5, 5)}</P>
        </View>

        <View>{active && <CircleCheckedSvg variant="fill" />}</View>
      </TouchableOpacity>
    </Swipeable>
  );
}
