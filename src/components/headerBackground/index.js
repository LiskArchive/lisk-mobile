import React from 'react';
import { Image, View } from 'react-native';
import stripes from '../../assets/images/stripes.png';
import topBubbles from '../../assets/images/topBubbles3x.png';
import withTheme from '../withTheme';
import getStyles from './styles';

const Bg = ({ bgType, styles }) => {
  let numericDimensions = {};
  let source = stripes;
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
