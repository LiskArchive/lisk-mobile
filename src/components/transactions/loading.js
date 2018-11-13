import React from 'react';
import { View, Image } from 'react-native';
import noActivityLight from '../../assets/images/loading3xLight.png';
import noActivityDark from '../../assets/images/loading3xDark.png';
import withTheme from '../withTheme';
import getStyles from './styles';
import { themes } from '../../constants/styleGuide';

const LoadingState = ({ theme, styles }) => (
  <View style={styles.emptyState}>
    {
      theme === themes.light ?
        <Image source={noActivityLight} style={styles.loading} /> :
        <Image source={noActivityDark} style={styles.loading} />
    }
  </View>);

export default withTheme(LoadingState, getStyles());
