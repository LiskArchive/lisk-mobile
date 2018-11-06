import React from 'react';
import { View } from 'react-native';
import withTheme from '../withTheme';
import getStyles from './styles';

const EmptyState = ({ styles }) => <View style={styles.footer}></View>;

export default withTheme(EmptyState, getStyles());
