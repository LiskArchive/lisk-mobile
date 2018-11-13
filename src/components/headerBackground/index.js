import React from 'react';
import { Image, View } from 'react-native';
import stripesLight from '../../assets/images/stripesLight.png';
import stripesDark from '../../assets/images/stripesDark.png';
import topBubbles from '../../assets/images/topBubbles3x.png';
import withTheme from '../withTheme';
import getStyles from './styles';

const Bg = ({ bgType, styles, theme }) => {
  let numericDimensions = {};
  let source = theme === 'light' ? stripesLight : stripesDark;
  if (bgType === 'bubbles') {
    numericDimensions = { width: 375, height: 97 };
    source = topBubbles;
  }
  return (<View>
    <Image
      style={[styles.main, numericDimensions]}
      source={source}
    />
  </View>);
};

export default withTheme(Bg, getStyles());
