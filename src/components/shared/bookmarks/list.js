import React from 'react';
import { View } from 'react-native';
import { DraggableItem, Item } from './item';
import withTheme from '../withTheme';
import getStyles from './styles';
import { validateAddress } from '../../../utilities/validators';

const List = ({
  styles, list, activeToken, showAvatar, setRef, navigate, draggable
}) => {
  const Element = draggable ? DraggableItem : Item;
  return (
    <View style={[!list?.length && styles.emptyState]}>
      {list?.map((item) => (
        <Element
          showAvatar={showAvatar}
          setRef={setRef}
          navigate={navigate}
          key={`${activeToken}-${item.address}`}
          data={item}
          isInvalidAddress={validateAddress('LSK', item.address) !== -1}
        />
      ))}
    </View>
  );
};

export default withTheme(List, getStyles());
