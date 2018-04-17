import React, { Fragment } from 'react';
import { View, Image } from 'react-native';
import { PricingCard } from 'react-native-elements';
import FormattedDate from '../formattedDate';
import { fromRawLsk } from '../../utilities/conversions';
import styles from './styles';
import defaultAvatar from './defaultAvatar.png';

/**
 * @todo Avatar Creator utility is not implemented
 */
export default (props) => {
  const address = 'default';
  return <View style={[styles.figure, props.avatarWrapper]}>
      <Image
        style={[styles.avatar, props.avatarImage]}
        source={defaultAvatar} />
    </View>;
};
