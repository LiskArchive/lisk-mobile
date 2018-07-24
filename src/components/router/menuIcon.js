import React from 'react';
import Icon from '../toolBox/icon';

const MenuIcon = ({ focused, active, inactive }) =>
  <Icon src={focused ? active : inactive} style={{ marginBottom: 0 }} size={24} />;

export default MenuIcon;
