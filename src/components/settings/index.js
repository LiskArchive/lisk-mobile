import React from 'react';
import { ScrollView } from 'react-native';
import { H1 } from '../toolBox/typography';
import styles from './styles';

class Settings extends React.Component {
  title = 'Settings';
  render() {
    return (<ScrollView>
       <H1 style={styles.title}>{this.title}</H1>
    </ScrollView>);
  }
}

export default Settings;
