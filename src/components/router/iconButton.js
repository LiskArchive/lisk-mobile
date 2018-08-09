import React, { Fragment } from 'react';
import { TouchableHighlight, Text } from 'react-native';
import Icon from '../toolBox/icon';
import styles from './styles';

const IconButton = ({
  icon, title, target, color, navigation,
}) =>
  <TouchableHighlight onPress={() => navigation.replace(target)} style={styles.iconButton}>
    <Fragment>
      <Icon name={icon} size={30} color={color} />
      <Text style={styles.iconButtonTitle}>{ title }</Text>
    </Fragment>
  </TouchableHighlight>;

export default IconButton;
