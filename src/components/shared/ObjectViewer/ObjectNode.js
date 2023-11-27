import React from 'react';
import { View } from 'react-native';
import { P } from 'components/shared/toolBox/typography';
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
      <P style={[styles.text, styles.theme.text]}>{`{`}</P>
      {entries.map((key) => (
        <View key={key} style={styles.container}>
          <P style={[styles.text, styles.theme.text]}>{JSON.stringify(key)}: </P>
          <P style={[styles.text, styles.theme.text, styles.flex]}>{JSON.stringify(data[key])},</P>
        </View>
      ))}
      <P style={[styles.text, styles.theme.text]}>{`}`}</P>
    </View>
  );
};

export default ObjectNode;
