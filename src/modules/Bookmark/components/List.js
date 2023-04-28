import React from 'react';

import InfiniteScrollList from 'components/shared/InfiniteScrollList';
import { validateAddress } from 'utilities/validators';
import withTheme from 'components/shared/withTheme';
import { DraggableItem, Item } from './Item';
import getStyles from './styles';

const List = ({ list, onPress, draggable, Component }) => {
  const Element = Component || (draggable ? DraggableItem : Item);

  return (
    <InfiniteScrollList
      data={list}
      renderItem={(item) => (
        <Element
          showAvatar
          onPress={onPress}
          data={item}
          isInvalidAddress={validateAddress(item.address) === 1}
        />
      )}
    />
  );
};

export default withTheme(List, getStyles());
