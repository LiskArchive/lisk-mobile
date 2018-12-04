import React from 'react';
import Icon from '../../toolBox/icon';
import { colors } from '../../../constants/styleGuide';

const HeaderLogo = ({ color }) => (
  <Icon
    name='lisk'
    size={30}
    color={color || colors.light.white}
    style={{
      lineHeight: 40,
      top: -3,
    }}
  />
);

export default HeaderLogo;
