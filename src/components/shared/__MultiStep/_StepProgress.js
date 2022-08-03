import React from 'react';
import { View } from 'react-native';
import { B, P } from '../toolBox/typography';
import withTheme from '../withTheme';
import getStyles from './styles';

const StepProgress = ({ styles, currentIndex, length }) => {
  return (
    <View style={styles.container}>
      <B style={styles.theme.step} >Step </B>
      <B style={styles.theme.stessp} >{currentIndex}</B>
      <B style={styles.theme.step} >/</B>
      <P style={styles.theme.step} >{length}</P>
    </View>
  );
};

export default withTheme(StepProgress, getStyles());
