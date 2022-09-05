import React from 'react';
import { FlatList, View } from 'react-native';
import { validateAddress } from 'utilities/validators';
import withTheme from 'components/shared/withTheme';
import { DraggableItem, Item } from './Item';
import getStyles from './styles';

const List = ({
  styles, list, navigate, draggable
}) => {
  const Element = draggable ? DraggableItem : Item;
  return (
    <View style={[!list.length && styles.emptyState]}>
      <FlatList
        data={list}
        renderItem={({ item }) => <Element
        showAvatar={true}
        navigate={navigate}
        key={item.address}
        data={item}
        isInvalidAddress={validateAddress('LSK', item.address) === 1} />}
      />
    </View>
  );
};

export default withTheme(List, getStyles());
