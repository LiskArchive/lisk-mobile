import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import withTheme from 'components/shared/withTheme';
import getStyles from './styles';

const AuthTypeItem = ({
  illustration, label, styles, onPress, testID
}) => (
  <TouchableOpacity
    style={[styles.container, styles.theme.container]}
    onPress={onPress}
    testID={testID}
  >
    <View style={styles.illustration}>{illustration}</View>
    <View>
      <Text style={[styles.label, styles.theme.label]}>{label}</Text>
    </View>
  </TouchableOpacity>
);

export default withTheme(AuthTypeItem, getStyles());
