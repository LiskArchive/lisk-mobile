import React from 'react';
import { View } from 'react-native';
import Icon from '../toolBox/icon';
import colors from '../../constants/styleGuide/colors';
import styles from './styles';

const Logo = () => <View style={styles.logo}><Icon name='lisk' size={30} color={colors.white} /></View>;

export default Logo;
