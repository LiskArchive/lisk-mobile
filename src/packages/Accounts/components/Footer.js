import React from 'react';
import { View } from 'react-native';
import withTheme from 'components/shared/withTheme';
import getStyles from './styles';

const Footer = ({ styles }) => <View style={styles.footer}></View>;

export default withTheme(Footer, getStyles());
