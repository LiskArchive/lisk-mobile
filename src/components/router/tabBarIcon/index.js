import React from 'react';
import Icon from '../../toolBox/icon';

const TabBarIcon = ({ name, tintColor, focused }) => (
  <Icon
    size={20}
    name={focused ? `${name}-filled` : name}
    color={tintColor}
  />
);

export default TabBarIcon;
