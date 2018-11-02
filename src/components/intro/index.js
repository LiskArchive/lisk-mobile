import React from 'react';
import { View } from 'react-native';
import connect from 'redux-connect-decorator';
import SplashScreen from 'react-native-splash-screen';
import Splash from './splash';
import Heading from './heading';
import {
  settingsUpdated as settingsUpdatedAction,
} from '../../actions/settings';
import styles from './styles';

@connect(state => ({}), {
  settingsUpdated: settingsUpdatedAction,
})
class Intro extends React.Component {
  skip() {
    this.props.navigation.navigate('SignIn', { signOut: true });
  }

  componentDidMount() {
    SplashScreen.hide();
    this.props.settingsUpdated({ showedIntro: true });
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    return (<View style={styles.wrapper}>
      <Splash />
      <Heading skip={this.skip.bind(this)} />
    </View>);
  }
}

export default Intro;
