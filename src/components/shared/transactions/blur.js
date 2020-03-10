import React from 'react';
import { View, Image } from 'react-native';
import withTheme from '../../shared/withTheme';
import getStyles from './styles';
import darkMediumOutgoing from '../../../assets/images/amountBlur/outgoing/darkMedium.png';
import darkSmallOutgoing from '../../../assets/images/amountBlur/outgoing/darkSmall.png';
import darkMediumIncoming from '../../../assets/images/amountBlur/incoming/darkMedium.png';
import darkSmallIncoming from '../../../assets/images/amountBlur/incoming/darkSmall.png';
import lightMediumOutgoing from '../../../assets/images/amountBlur/outgoing/lightMedium.png';
import lightSmallOutgoing from '../../../assets/images/amountBlur/outgoing/lightSmall.png';
import lightMediumIncoming from '../../../assets/images/amountBlur/incoming/lightMedium.png';
import lightSmallIncoming from '../../../assets/images/amountBlur/incoming/lightSmall.png';

const blurs = {
  outgoing: {
    darkMedium: darkMediumOutgoing,
    darkSmall: darkSmallOutgoing,
    lightMedium: lightMediumOutgoing,
    lightSmall: lightSmallOutgoing,
  },
  incoming: {
    darkMedium: darkMediumIncoming,
    darkSmall: darkSmallIncoming,
    lightMedium: lightMediumIncoming,
    lightSmall: lightSmallIncoming,
  },
};

const Blur = ({
  styles, direction, theme, value, style
}) => {
  const valueSize = value.length > 2 ? 'Medium' : 'Small';
  return (
    <View style={[styles.amount, style]}>
      <Image
        style={styles[`blur${valueSize}`]}
        source={blurs[direction][`${theme}${valueSize}`]}
      />
    </View>
  );
};

export default withTheme(Blur, getStyles());
