import React from 'react';
import { FlatList, View } from 'react-native';
import { validateAddress } from 'utilities/validators';
import withTheme from 'components/shared/withTheme';
import { DraggableItem, Item } from './Item';
import getStyles from './styles';

const List = ({
  styles, list, onPress, draggable, Component
}) => {
  const Element = Component || (draggable ? DraggableItem : Item);

  return (
    <View style={[!list.length && styles.emptyState]}>
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <Element
            showAvatar
            onPress={onPress}
            data={item}
            isInvalidAddress={validateAddress('LSK', item.address) === 1}
          />
        )}
      />
    </View>
  );
};

export default withTheme(List, getStyles());
