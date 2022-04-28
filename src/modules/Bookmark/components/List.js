import React from 'react';
import { View } from 'react-native';
import { validateAddress } from 'utilities/validators';
import withTheme from 'components/shared/withTheme';
import { DraggableItem, Item } from './Item';
import getStyles from './styles';

const List = ({
  styles, list, activeToken, showAvatar, setRef, navigate, draggable
}) => {
  const Element = draggable ? DraggableItem : Item;
  return (
    <View style={[!list.length && styles.emptyState]}>
      {list.map((item) => (
        <Element
          showAvatar={showAvatar}
          setRef={setRef}
          navigate={navigate}
          key={`${activeToken}-${item.address}`}
          data={item}
          isInvalidAddress={validateAddress('LSK', item.address) === 1}
        />
      ))}
    </View>
  );
};

export default withTheme(List, getStyles());
