import React from 'react';
import { View, SafeAreaView } from 'react-native';
import withTheme from '../withTheme';
import getStyles from './styles';

const Banner = ({ styles, children }) => (
  <View style={[styles.container, styles.theme.container]}>
    <SafeAreaView style={styles.flex} >
      {children}
    </SafeAreaView>
  </View>
);

export default withTheme(Banner, getStyles());
