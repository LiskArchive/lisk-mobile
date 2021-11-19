import React from 'react';
import { View } from 'react-native';
import { B, P } from '../toolBox/typography';
import withTheme from '../withTheme';
import getStyles from './styles';

const StepProgress = ({ styles, currentIndex, length }) => {
  return (
    <View style={styles.container}>
      <B>Step </B>
      <B>{currentIndex}</B>
      <B>/</B>
      <P>{length}</P>
    </View>
  );
};

export default withTheme(StepProgress, getStyles());
