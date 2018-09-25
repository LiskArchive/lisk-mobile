import React from 'react';
import { View } from 'react-native';
import { H1, H4 } from '../toolBox/typography';
import ItemTitle from './itemTitle';
import styles from './styles';

const Settings = ({ navigation }) => (
  <View style={styles.container}>
    <H1>Settings</H1>
    <View style={styles.group}>
      <H4>About</H4>
      <View style={styles.item}>
        <ItemTitle
          navigation={navigation}
          target='About'
          icon='about'
          iconSize={21}
          title='About Lisk'/>
      </View>
      <View style={styles.item}>
        <ItemTitle
          navigation={navigation}
          icon='terms'
          target='Terms'
          iconSize={21}
          title='Terms of use'/>
      </View>
    </View>
  </View>
);

export default Settings;
