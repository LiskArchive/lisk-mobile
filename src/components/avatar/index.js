import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import defaultAvatar from './defaultAvatar.png';

/**
 * @todo Avatar Creator utility is not implemented
 */
const Avatar = ({ avatarWrapper, avatarImage }) =>
  <View style={[styles.figure, avatarWrapper]}>
    <Image
      style={[styles.avatar, avatarImage]}
      source={defaultAvatar} />
    </View>;


export default Avatar;
