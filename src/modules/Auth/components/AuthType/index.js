import React from 'react';
import { View, Text } from 'react-native';
import withTheme from 'components/shared/withTheme';
import getStyles from './styles';

const AuthTypeItem = ({ illustration, label, styles }) => <View style={styles.container} >
  <View style={styles.illustration} >
    {illustration}
  </View>
  <View>
    <Text style={styles.label} >
      {label}
    </Text>
  </View>
</View>;

export default withTheme(AuthTypeItem, getStyles());
