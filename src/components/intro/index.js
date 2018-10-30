import React from 'react';
import { View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Splash from './splash';
import Heading from './heading';

import styles from './styles';

class Intro extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  componentDidMount() {
    SplashScreen.hide();
  }

  skip = () => {
    this.props.navigation.navigate('Login', { signOut: true });
  }

  render() {
    return (<View style={styles.wrapper}>
      <Splash />
      <Heading skip={this.skip} />
    </View>);
  }
}

export default Intro;
