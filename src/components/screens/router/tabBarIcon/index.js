import React from 'react';
import Icon from '../../../shared/toolBox/icon';

const TabBarIcon = ({ name, color, focused }) => (
  <Icon size={20} name={focused ? `${name}-filled` : name} color={color} />
);

export default TabBarIcon;
