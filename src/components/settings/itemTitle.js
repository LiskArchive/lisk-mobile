import React, { Fragment } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { P } from '../toolBox/typography';
import Icon from '../toolBox/icon';
import { colors } from '../../constants/styleGuide';
import styles from './styles';

/**
 * A single setting item with icon and title
 *
 * @param {Object} data
 * @param {String} data.icon - The name of the icon in our icon font asset
 * @param {Number} data.iconSize - The size of the icon in pixels
 * @param {String} data.title - The title of the setting item
 * @param {String} data.target - The name of the route to navigate to.
 *  The route must be defined in the router
 * @param {Object} data.navigation - The Navigation object. if the target props is passed,
 *  we need this to ba able to navigate.
 */
const ItemTitle = ({
  icon, iconSize, title, target, navigation,
}) => {
  const props = {
    style: styles.itemTitle,
    underlayColor: 'transparent',
  };
  if (typeof target === 'string') {
    props.onPress = () => navigation.navigate(target);
  }

  return (<TouchableHighlight {...props}>
    <Fragment>
      <Icon name={icon} size={iconSize} color={colors.grayScale6} style={styles.itemIcon} />
      <View style={styles.itemName}><P style={styles.itemNameText}>{title}</P></View>
      <Icon name='forward' size={21} color={colors.black} style={styles.itemArrow} />
    </Fragment>
  </TouchableHighlight>);
};

export default ItemTitle;
