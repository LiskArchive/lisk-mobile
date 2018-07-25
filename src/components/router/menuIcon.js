import React from 'react';
import Icon from '../toolBox/icon';
import colors from '../../constants/styleGuide/colors';

const MenuIcon = ({ focused, name }) => {
  const color = focused ? colors.primary5 : colors.grayScale3;
  return <Icon name={name} size={24} color={color} />;
};

export default MenuIcon;
