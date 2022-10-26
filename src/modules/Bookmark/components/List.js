import React from 'react';
import { FlatList } from 'react-native';
import { validateAddress } from 'utilities/validators';
import withTheme from 'components/shared/withTheme';
import { DraggableItem, Item } from './Item';
import getStyles from './styles';

const List = ({ list, onPress, draggable, Component }) => {
  const Element = Component || (draggable ? DraggableItem : Item);

  return (
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
  );
};

export default withTheme(List, getStyles());
