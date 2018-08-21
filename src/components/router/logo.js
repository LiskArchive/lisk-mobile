import React from 'react';
import Icon from '../toolBox/icon';
import { colors } from '../../constants/styleGuide';
import styles from './styles';

const Logo = ({ color }) => <Icon name='lisk' size={30} color={color || colors.white} style={styles.logo} />;

export default Logo;
