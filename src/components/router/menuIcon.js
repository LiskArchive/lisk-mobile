import React from 'react';
import Icon from '../toolBox/icon';
import { colors } from '../../constants/styleGuide';

const MenuIcon = ({ focused, name }) => {
  const color = focused ? colors.light.blue : colors.light.gray4;
  return <Icon name={name} size={24} color={color} />;
};

export default MenuIcon;
