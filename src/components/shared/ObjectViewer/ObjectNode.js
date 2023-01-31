import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'contexts/ThemeContext';
import getStyles from './ObjectViewer.styles';

/**
 *
 * @param {Object} data
 * @returns ReactNode
 *
 */

const ObjectNode = ({ data, style }) => {
  const { styles } = useTheme({ styles: getStyles() });
  const entries = Object.keys(data);
  return (
    <View style={style}>
      <Text style={[styles.text, styles.theme.text]}>{`{`}</Text>
      {entries.map((key) => (
        <View key={key} style={styles.container}>
          <Text style={[styles.text, styles.theme.text]}>{JSON.stringify(key)}: </Text>
          <Text style={[styles.text, styles.theme.text, styles.flex]}>
            {JSON.stringify(data[key])},
          </Text>
        </View>
      ))}
      <Text style={[styles.text, styles.theme.text]}>{`}`}</Text>
    </View>
  );
};

export default ObjectNode;
