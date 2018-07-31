import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import Icon from '../toolBox/icon';
import colors from '../../constants/styleGuide/colors';

const Logo = ({ color }) =>
  <View style={styles.image}>
    <Icon name='lisk' color={color || colors.black} size={100} />
  </View>;

export default Logo;
